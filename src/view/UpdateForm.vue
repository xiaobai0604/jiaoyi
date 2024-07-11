<template>
  <div class="update-form">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3">Consigner</span>
      </template>
    </el-page-header>

    <hr>
    <div class="PageName">
      <h2>商品发货</h2>
    </div>
    <!-- 你的更新表单内容 -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
  /* 你的样式 */
</style>
