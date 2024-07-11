<template>
  <div>
    <div class="manage-form">
      <div class="manage-title">
        <h2>管理二手商品</h2>
      </div>
      <div class="search-container" style="margin-bottom: 20px;">
        <el-input v-model="searchName" placeholder="按名称搜索商品" style="width: 300px; margin-right: 20px;" />
        <el-button @click="searchProduct">搜索</el-button>
      </div>
      <el-table :data="paginatedData" style="width: 100%">
        <el-table-column label="No" prop="no" />
        <el-table-column label="Name" prop="name" />
        <el-table-column label="Image" prop="image">
          <template v-slot="{ row }">
            <img :src="`/${row.image}`" alt="Product Image" style="max-width: 100px; max-height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="Quantity" prop="quantity" />
        <el-table-column label="Price" prop="price" />
        <el-table-column label="Grounding" prop="ifground">
          <template v-slot="{ row }">
            <span>{{ row.ifground === 1 ? '已上架' : '未上架' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions">
          <template v-slot="{ row }">
            <el-button @click="editProduct(row)">编辑</el-button>
            <el-button @click="deleteProduct(row.id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="filteredData.length"
        layout="total, prev, pager, next, jumper"
      ></el-pagination>
    </div>

    <el-dialog v-model="dialogFormVisible" title="编辑商品" width="500" @close="resetEditForm">
      <el-form :model="editForm">
        <el-form-item label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="editForm.quantity" type="number"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editForm.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>
        <el-form-item label="上架状态">
          <el-radio-group v-model="editForm.ifground">
            <el-radio :label="1">已上架</el-radio>
            <el-radio :label="0">未上架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片">
          <input type="file" @change="handleFileChange" ref="fileInput">
          <img v-if="editForm.image" :src="`/${editForm.image}`" alt="Product Image" style="max-width: 100px; max-height: 100px;">
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelEdit">取消</el-button>
          <el-button type="primary" @click="updateProduct">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const tableData = ref([]);
const dialogFormVisible = ref(false);
const editForm = ref({ id: '', name: '', quantity: '', price: '', ifground: 0, description: '', image: '' });
const currentPage = ref(1);
const pageSize = ref(10);
const searchName = ref('');
const file = ref(null);
const fileInput = ref(null); // 用于引用文件输入元素

const fetchData = async () => {
  try {
    const response = await axios.get('/products');
    tableData.value = response.data.map((item, index) => ({
      no: index + 1,
      id: item.id,
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
      ifground: item.ifground,
      description: item.description,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const searchProduct = () => {
  currentPage.value = 1;  // 重置分页到第一页
};

const filteredData = computed(() => {
  return tableData.value.filter(item => {
    return item.name.toLowerCase().includes(searchName.value.toLowerCase());
  });
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

const handleCurrentChange = (page) => {
  currentPage.value = page;
};

const editProduct = (product) => {
  editForm.value = { ...product };
  dialogFormVisible.value = true;
};

const handleFileChange = (event) => {
  file.value = event.target.files[0];
};

const resetEditForm = () => {
  editForm.value = { id: '', name: '', quantity: '', price: '', ifground: 0, description: '', image: '' };
  file.value = null;
  if (fileInput.value) {
    fileInput.value.value = ''; // 清除文件输入
  }
};

const cancelEdit = () => {
  dialogFormVisible.value = false;
  resetEditForm();
};

const updateProduct = async () => {
  const formData = new FormData();
  formData.append('name', editForm.value.name);
  formData.append('quantity', editForm.value.quantity);
  formData.append('price', editForm.value.price);
  formData.append('ifground', editForm.value.ifground ? 1 : 0);
  formData.append('description', editForm.value.description);
  if (file.value) {
    formData.append('image', file.value);
  }

  try {
    await axios.put(`/products/${editForm.value.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    await fetchData(); // 刷新表格数据
    dialogFormVisible.value = false;
    resetEditForm(); // 重置表单
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

const deleteProduct = async (id) => {
  try {
    await axios.delete(`/products/${id}`);
    fetchData();
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.manage-form .manage-title {
  font-size: 2em;
  text-align: center;
  text-shadow: 5px 5px 5px #0e42ff;
}

.manage-form {
  background-color: aliceblue;
}

.search-container {
  text-align: right;
}
</style>
