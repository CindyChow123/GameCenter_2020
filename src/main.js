import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/ant-design-vue.js'
import axios from 'axios'
import './static/reset.less'
import md5 from './assets/md5'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://47.115.50.249'
// axios.defaults.baseURL = 'http://10.21.20.191'
// axios.defaults.baseURL = 'http://10.21.128.97'
// axios.defaults.baseURL = 'http://mockjs.docway.net/mock/1a98zbpmUHR'
Vue.prototype.$http = axios
Vue.prototype.$md5 = md5
axios.interceptors.request.use(config => {
  // add Authorization to header
  if (window.sessionStorage.getItem('token')) {
    config.headers.token = window.sessionStorage.getItem('token')
  }
  return config
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
