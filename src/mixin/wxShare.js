import qs from 'qs'
const wx = require('weixin-js-sdk')
export default {
  methods: {
    wxReady (info) {
      let that = this
      wx.ready(function () {
        wx.showOptionMenu()
        wx.onMenuShareTimeline({
          title: info.title,
          link: info.link,
          imgUrl: info.imgUrl,
          success: function () {
            that.$toast('已成功分享到朋友圈')
          },
          cancel: function () {
            that.$toast('已取消分享')
          }
        })
        wx.onMenuShareAppMessage({
          title: info.title,
          desc: info.desc,
          link: info.link,
          imgUrl: info.imgUrl,
          success: function () {
            // that.$toast('已成功分享给您的朋友')
          },
          cancel: function () {
            that.$toast('已取消分享')
          }
        })
      })
    },
    weChatShare (info) {
      let that = this
      let url = ''
      // 判断苹果手机
      if (window.__wxjs_is_wkwebview === true) {
        url = this.$store.state.iosUrl || window.location.href
      } else {
        url = window.location.href
      }
      window.$axios(this.$dataURL + '/getWxJsParams', qs.stringify({
        url: url,
        signId: that.$localStorage('signId')
      })).then(res => {
        let wxConfig = res.data.attr
        wx.config({
          debug: false,
          appId: wxConfig.appid,
          timestamp: wxConfig.timestamp,
          nonceStr: wxConfig.nonceStr,
          signature: wxConfig.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showOptionMenu']
        })
        that.wxReady(info)
      }, err => {
        console.error('微信分享失败', err.data.message)
      })
    }
  }
}
