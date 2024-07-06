<template>
  <div class="home">
    <button @click="navigateToUpload">上传二手商品</button>
    <button @click="navigateToUpdate">更新二手商品</button>
    <button @click="navigateToManage">管理二手商品</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();

    const navigateToUpload = () => {
      router.push('/upload');
    };

    const navigateToUpdate = () => {
      router.push('/update');
    };

    const navigateToManage = () => {
      router.push('/manage');
    };

    return { navigateToUpload, navigateToUpdate, navigateToManage };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>

