const serialize = (obj) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    console.error('[Vue warn]: serialize must is a object')
  }

  let arr = []
  for (let key in obj) {
    if (!obj[key]) {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    } else {
      let reg = /(^\s*)|(\s*$)/g
      obj[key] = obj[key] + ''
      let val = obj[key].replace(reg, '')
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val))
    }
  }

  return arr.join('&')
}

export default serialize
