// localStorage本地存储
function localStorage (Vue) {
  const localStorage = window.localStorage
  Vue.prototype.$localStorage = function (key, val) {
    if (!key) {
      return localStorage
    } else if (!val) {
      return localStorage.getItem(key)
    } else {
      localStorage.setItem(key, val)
      return true
    }
  }

  Vue.prototype.$rmLocalStorage = function (key) {
    if (key) {
      localStorage.removeItem(key)
    } else {
      localStorage.clear()
    }
  }
}

export default localStorage
