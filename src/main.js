// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 移动端适配
import '@/assets/js/rem.js'
// 引入样式
import '@/assets/css/reset.less'
import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css'
import '@/assets/css/animate.min.css'
import '@/assets/css/style.less'

// 引入第三方库
import MintUI from 'mint-ui'
import axios from 'axios'
// vuex
import store from './store/index.js'
// 引入插件
import ajax from '@/utils/ajax'
import sessionStorage from '@/utils/sessionStorage'
import localStorage from '@/utils/localStorage'
import WxPay from './utils/wx-pay'
// 整页loading
import BigLoading from './components/BigLoading.vue'

// 使用插件
Vue.use(MintUI)
Vue.use(ajax, axios)
Vue.use(sessionStorage)
Vue.use(localStorage)
Vue.use(WxPay)

Vue.component(BigLoading.name, BigLoading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
router.beforeEach((to, from, next) => {
  if (!store.state.iosUrl) {
    store.commit('setUrl', document.URL)
  }
  next()
})
