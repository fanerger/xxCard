const plugin = {
  install (Vue) {
    function wxPay (payParams, urlType, autoReg, subscribe) {
      let that = this
      window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
        'appId': payParams.appId + '',
        'timeStamp': payParams.timeStamp + '',
        'nonceStr': payParams.nonceStr + '',
        'package': 'prepay_id=' + payParams.prepayId,
        'signType': 'MD5',
        'paySign': payParams.sign + ''
      }, function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          if (urlType === 'xxcard') {
            // 去引导页
            if (subscribe !== 1) {
              that.$router.push('/guide')
            } else {
              // 去引导页
              if (autoReg === 1) {
                that.$router.push('/guide')
              } else {
                that.$router.push('/bought')
              }
            }
          } else {
            this.$router.go()
            // that.$router.push('/paySuccess?orderId=' + payParams.orderId + '&urlType=cust')
          }
        } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
          that.$messagebox('提示', '微信支付失败')
        }
      })
    }
    Vue.prototype.$wxPay = wxPay
  }
}

export default plugin
