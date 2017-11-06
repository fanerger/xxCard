import qs from 'qs'
// axios网络请求
function ajax (Vue, axios) {
  if (ajax.installed) return
  Vue.prototype.$baseURL = axios.defaults.baseURL = (process.env.NODE_ENV === 'production') ? '/cpQuery/' : 'http://192.168.10.81/cpQuery/'
  Vue.prototype.$dataURL = 'https://phone.xxjr.com/busi/'
  // Vue.prototype.$dataURL = 'http://192.168.10.87/busi/'
  window.$axios = axios.post
  Vue.prototype.$ajax = function (params) {
    let data = params['data'] || {}
    let signId = this.$localStorage('signId')
    if (signId) data['signId'] = signId
    axios.post(params['url'], qs.stringify(data)).then(res => {
      if (res.headers.signid) {
        window.localStorage.setItem('signId', res.headers.signid)
      }
      res = res.data
      if (res.success) {
        if (params['success'] !== undefined) params.success(res)
      } else {
        if (!params['fail']) this.$toast(res.message)
        else params.fail(res)
      }
    }).catch(err => {
      let status = err.response.status || 404
      this.$messagebox.alert(`${status} 抱歉，服务器开小差了~`)
      if (params['error'] !== undefined) params.error(err)
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ajax)
}

export default ajax
