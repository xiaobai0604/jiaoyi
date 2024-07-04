<template>
  <div class="admin-page">
    <div class="sidebar">
      <el-button type="primary" class="logout-button" @click="logout">退出</el-button>
      <el-menu default-active="1-1" class="el-menu-vertical-demo">
        <el-menu-item index="1-1" @click="navigate('user-management')">用户管理</el-menu-item>
        <el-menu-item index="1-2" @click="navigate('order-management')">订单管理</el-menu-item>
        <el-menu-item index="1-3" @click="navigate('info-management')">信息上架管理</el-menu-item>
        <el-menu-item index="1-4" @click="navigate('log-management')">日志管理</el-menu-item>
        <el-menu-item index="1-5" @click="navigate('report-management')">数据报表管理</el-menu-item>
        <el-menu-item index="1-6" @click="navigate('workflow-management')">后台流程管理</el-menu-item>
        <el-menu-item index="1-7" @click="navigate('software-management')">软件管理</el-menu-item>
      </el-menu>
    </div>
    <div class="main-content">
      <div class="admin-header">
        <el-button type="text" icon="ArrowLeft" class="back-button" @click="navigateBack"></el-button>
        <span class="admin-title">后台管理</span>
        <span class="admin-name">{{ adminName }}</span>
      </div>
      <div class="admin-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLeft } from '@element-plus/icons-vue'

export default {
  name: 'Admin',
  data() {
    return {
      adminName: '管理员姓名'
    }
  },
  methods: {
    navigate(route) {
      this.$router.push({ name: route });
    },
    navigateBack() {
      this.$router.go(-1);
    },
    logout() {
      this.$router.push({ path: '/' });
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.admin-page {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  background-color: #001529;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  flex-shrink: 0; /* 确保侧边栏不会缩小 */
}

.logout-button {
  width: 80%;
  margin-bottom: 20px;
}

.el-menu-vertical-demo {
  width: 100%;
  border-right: none;
  background-color: #001529;
}

.el-menu-item {
  color: #fff;
}

.el-menu-item:hover,
.el-menu-item:focus {
  background-color: #1890ff;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  overflow: hidden;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.back-button {
  font-size: 24px;
}

.admin-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

.admin-name {
  font-size: 18px;
  font-weight: bold;
}

.admin-content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
</style>