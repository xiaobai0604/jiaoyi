<template>
  <div class="upload-form-wrapper">
    <div class="upload-form">
      <h2>上传二手商品</h2>
      <form @submit.prevent="upload">
        <label for="name">商品名称</label>
        <input type="text" id="name" v-model="form.name" required />

        <label for="image">商品图片</label>
        <input type="file" id="image" @change="handleImageUpload" accept="image/*" required />

        <label for="description">商品描述</label>
        <textarea id="description" v-model="form.description" rows="3" required></textarea>

        <label for="quantity">数量</label>
        <input type="number" id="quantity" v-model="form.quantity" min="1" required />

        <label for="price">价格 (元)</label>
        <input type="number" id="price" v-model="form.price" step="0.01" required />

        <div class="radio-group">
          <label>是否上架</label>
          <el-radio-group v-model="form.ifground" class="radio-options">
            <el-radio :label="true">上架</el-radio>
            <el-radio :label="false">不上架</el-radio>
          </el-radio-group>
        </div>

        <div class="button-container">
          <button type="submit">上传商品</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

export default {
  name: 'UploadForm',
  setup() {
    const form = ref({
      name: '',
      image: null,
      description: '',
      quantity: 1,
      price: 0,
      ifground: false,
    });

    const router = useRouter();

    const handleImageUpload = (event) => {
      form.value.image = event.target.files[0];
    };

    const upload = async () => {
      const formData = new FormData();
      formData.append('name', form.value.name);
      formData.append('image', form.value.image);
      formData.append('description', form.value.description);
      formData.append('quantity', form.value.quantity);
      formData.append('price', form.value.price);
      formData.append('ifground', form.value.ifground ? 1 : 0);

      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.message === 'Product uploaded successfully') {
          ElMessage.success('商品上传成功！');
          router.push('/'); // 导航到主界面
        } else {
          ElMessage.error('商品上传失败！');
        }
      } catch (error) {
        console.error('Error:', error);
        ElMessage.error('上传过程中出现错误！');
      }
    };

    return {
      form,
      handleImageUpload,
      upload
    };
  },
};
</script>

<style scoped>
.upload-form-wrapper {
  background-image: url('/src/assets/backChuan.jpg');
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.upload-form {
  background-color: beige;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-height: 90vh; /* 确保内容适应屏幕 */
  overflow-y: auto;
}

.upload-form h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em; /* 调整字体大小 */
}

.upload-form label {
  display: block;
  margin-bottom: 6px;
  font-size: 1em; /* 调整字体大小 */
}

.upload-form input,
.upload-form textarea {
  width: 90%;
  padding: 6px; /* 调整内边距 */
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em; /* 调整字体大小 */
}

.upload-form input[type='file'] {
  border: none;
  font-size: 1em; /* 调整字体大小 */
}

.radio-group {
  margin-bottom: 10px; /* 增加间距 */
}

.radio-options {
  display: flex;
  justify-content: space-around;
  margin-top: 10px; /* 增加内部间距 */
}

.button-container {
  text-align: center; /* 居中对齐按钮容器 */
}

.upload-form button {
  width: 60%;
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: 3px solid #4caf50;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1em; /* 调整字体大小 */
}

.upload-form button:hover {
  background-color: #0056b3;
}
</style>
