import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/ant-design-vue.js'
import axios from 'axios'
import './static/reset.less'

Vue.config.productionTip = false
// axios.defaults.baseURL = 'https://mockapi.eolinker.com/MDE9rmu543f89a39adabfa4d62a909ce834ecfba6a59633'
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  // add Authorization to header
  if (window.sessionStorage.getItem('token')) {
    config.headers.Authorization = window.sessionStorage.getItem('token')
  }
  return config
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
