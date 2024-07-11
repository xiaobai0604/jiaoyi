<template>
  <el-container style="height: 100vh;">
    <el-aside width="150px" style="height: 100%;">
      <el-menu default-active="1"
        class="el-menu-vertical-demo" 
        background-color="#545c64"
        text-color="#fff"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">购物车</el-menu-item>
        <el-menu-item index="3">订单</el-menu-item>
        <el-menu-item index="4">聊天</el-menu-item>
        <el-menu-item index="5">发布商品</el-menu-item>
        <el-menu-item index="6">管理商品</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <el-row align="middle" type="flex">
          <el-col :span="12">
            <div class="text">用户名: 小明</div>
          </el-col>
          <el-col :span="8">
            <div class="text">账号: 123456</div>
          </el-col>
          <el-col :span="2" :offset="2">
            <div class="avatar"></div>
          </el-col>
        </el-row>
      </el-header>

      <el-main style="background: #f6f4f4">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'UserInterface',
  setup() {
    const router = useRouter();
    
    const handleSelect = (index) => {
      switch(index) {
        case '1':
          router.push('/');
          break;
        case '2':
          router.push('/shopping-cart');
          break;
        case '3':
          router.push('/orders');
          break;
        case '4':
          router.push('/chat');
          break;
        case '5':
          router.push('/upload');
          break;
        case '6':
          router.push('/manage');
          break;
      }
    };
    
    return {
      handleSelect,
    };
  },
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}
.el-container {
  height: 100vh;
}
.el-menu-vertical-demo {
  height: 100%;
}
.header {
  height: 60px; 
  padding: 0 20px;
  background: #fff; 
  border-bottom: 1px solid #e4e4e4;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f2f2f2;
  text-align: center;
  line-height: 40px;
  background-image: url(/public/favicon.ico);
  background-size: cover; 
}
.text {
  line-height: 60px; 
}
</style>
