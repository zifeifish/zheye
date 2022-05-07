import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const icode = '68A64E449EB8FAAC'
axios.defaults.baseURL = 'http://apis.imooc.com/api'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode }
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
