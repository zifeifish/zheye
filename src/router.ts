import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home/Home.vue'
import Login from './views/Login/Login.vue'
import ColumnDetail from './views/Column/ColumnDetail.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    }
  ]
})

export default router
