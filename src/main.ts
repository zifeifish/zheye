import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import createMessage from '@/components/Message/createMessage'

const icode = '68A64E449EB8FAAC'
axios.defaults.baseURL = 'http://apis.imooc.com/api'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode }
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

axios.interceptors.response.use(response => {
  if (response.data.code === 0) {
    createMessage(`${response.data.msg}`, 'success')
  } else {
    createMessage(`${response.data.msg}`, 'error')
  }
  console.log(666, response)
  store.commit('setLoading', false)
  return response
}, e => {
  const { error } = e.response.data
  createMessage(`${error}`, 'error')
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
