const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const encodedFileName = encodeURIComponent(file.originalname);
    cb(null, Date.now() + '-' + encodedFileName);
  },
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chen123',
  database: 'wen',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('image'), (req, res) => {
  const { name, description, quantity, price, ifground } = req.body;
  const imagePath = `uploads/${req.file.filename}`;

  if (!name || !description || !quantity || !price || !imagePath) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = 'INSERT INTO products (name, image, description, quantity, price, ifground) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, imagePath, description, quantity, price, ifground];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      res.status(500).json({ message: 'Database error' });
      return;
    }
    res.status(200).json({ message: 'Product uploaded successfully', data: result });
  });
});

app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ message: 'Database error' });
      return;
    }
    const decodedResults = results.map(item => ({
      ...item,
      image: decodeURIComponent(item.image)
    }));
    res.status(200).json(decodedResults);
  });
});

app.put('/products/:id', upload.single('image'), (req, res) => {
  const { name, quantity, price, ifground, description } = req.body;
  const { id } = req.params;
  const image = req.file ? `uploads/${req.file.filename}` : null;

  if (!name || !quantity || !price || ifground === undefined || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  let sql = 'SELECT image FROM products WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ message: 'Database error' });
      return;
    }
    const oldImagePath = results[0].image;

    sql = 'UPDATE products SET name = ?, quantity = ?, price = ?, ifground = ?, description = ?';
    let values = [name, quantity, price, ifground, description];

    if (image) {
      sql += ', image = ?';
      values.push(image);
    }

    sql += ' WHERE id = ?';
    values.push(id);

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating data in database:', err);
        res.status(500).json({ message: 'Database error' });
        return;
      }

      if (image && oldImagePath) {
        fs.unlink(path.join(__dirname, oldImagePath), (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          }
        });
      }

      res.status(200).json({ message: 'Product updated successfully' });
    });
  });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT image FROM products WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ message: 'Database error' });
      return;
    }
    const imagePath = results[0].image;

    const deleteSql = 'DELETE FROM products WHERE id = ?';
    db.query(deleteSql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting data from database:', err);
        res.status(500).json({ message: 'Database error' });
        return;
      }

      if (imagePath) {
        fs.unlink(path.join(__dirname, imagePath), (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          }
        });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
