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
      component: Login,
      // redirectAlreadyLogin 已登录就重定向到首页
      meta: { redirectAlreadyLogin: true }
    },
    // 专栏列表
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    // 新建文章
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      // 添加路由元信息, 判断是否需要登录
      meta: { requiredLogin: true }
    }
  ]
})

/** 路由前置守卫 */
router.beforeEach((to, from, next) => {
  const isLogin = store.state.user.isLogin
  if (to.meta.requiredLogin && !isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && isLogin) {
    next('/')
  } else {
    next(true)
  }
})

export default router
