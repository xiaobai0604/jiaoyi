<template>
 <div id="app">
    <router-link to='/chat'>Chat</router-link>|
    <router-link to="/login">Login</router-link>
  <router-view/>
 </div>
</template>

<script>
import { createRouter, createWebHistory } from 'vue-router';
import Chat from './view/ChatWindow.vue';
import Login from './view/Login.vue';

const routes = [
    {path:'/chat',name: 'chat',component:Chat},
    {path:'/login',name: 'main',component:Login}
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default {
  name:'chat',
  name: 'App',
  router
}
</script>

<style scoped>

</style>
