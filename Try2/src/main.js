// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import UploadForm from './components/UploadForm.vue';
import UpdateForm from './components/UpdateForm.vue';
import ManageForm from './components/ManageForm.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 确保路径正确

const routes = [
  { path: '/', component: Home },
  { path: '/upload', component: UploadForm },
  { path: '/update', component: UpdateForm },
  { path: '/manage', component: ManageForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');

