import { createMemoryHistory, createRouter } from 'vue-router'

import Login from '../view/Login.vue'
import Main from '../view/Main.vue'
import Register from '../view/Register.vue'
import Admin from '../view/Admin.vue';
const routes = [
  { path: '/', component: Login },
  { path: '/main', component: Main },
  { path: '/register', component: Register },
  {
    path: '/admin',
    component: Admin,
    children: [
      { path: 'user-management', name: 'user-management', component: () => import('../view/backstage/UserManagement.vue') },
      { path: 'order-management', name: 'order-management', component: () => import('../view/backstage/OrderManagement.vue') },
      { path: 'info-management', name: 'info-management', component: () => import('../view/backstage/InfoManagement.vue') },
      { path: 'log-management', name: 'log-management', component: () => import('../view/backstage/LogManagement.vue') },
      { path: 'report-management', name: 'report-management', component: () => import('../view/backstage/ReportManagement.vue') },
      { path: 'workflow-management', name: 'workflow-management', component: () => import('../view/backstage/WorkflowManagement.vue') },
      { path: 'software-management', name: 'software-management', component: () => import('../view/backstage/SoftwareManagement.vue') }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes, 
})
export default router;