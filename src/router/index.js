import { createMemoryHistory, createRouter } from 'vue-router'

import Login from '../view/Login.vue'
import Main from '../view/Main.vue'
import Register from '../view/Register.vue'
const routes = [
  { path: '/', component: Login },
  { path: '/main', component: Main },
  { path: '/register', component: Register },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes, 
})
export default router;