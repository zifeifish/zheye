import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home/Home.vue'
import Login from './views/Login/Login.vue'
import ColumnDetail from './views/Column/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import store from './store'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 专栏列表
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    // 新建文文章
    {
      path: '/create',
      name: 'create',
      component: CreatePost
    }
  ]
})

/** 路由前置守卫 */
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else {
    next(true)
  }
})

export default router
