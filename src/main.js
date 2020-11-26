import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/ant-design-vue.js'
import axios from 'axios'
import './static/reset.less'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://10.17.91.184'
Vue.prototype.$http = axios
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
