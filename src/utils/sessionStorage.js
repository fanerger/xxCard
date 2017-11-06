// sessionStorage本地存储
function sessionStorage (Vue) {
  const sessionStorage = window.sessionStorage
  Vue.prototype.$sessionStorage = function (key, val) {
    if (!key) {
      return sessionStorage
    } else if (!val) {
      return sessionStorage.getItem(key)
    } else {
      sessionStorage.setItem(key, val)
      return true
    }
  }

  Vue.prototype.$rmSessionStorage = function (key) {
    if (key) {
      sessionStorage.removeItem(key)
    } else {
      sessionStorage.clear()
    }
  }
}

export default sessionStorage
