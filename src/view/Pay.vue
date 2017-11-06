<template>
  <div class='pay-box'>
    <div class='pay__icon'></div>
    <p class='pay__title'>等待支付</p>
    <p class='pay__text'>支付完成后您就可以自定义名片</p>
    <p class='pay__text'>请尽快支付以推广您的名片~</p>
    <button class='pay__btn default__btn' @click='wxPay'>微信支付</button>
    <big-loading :bigLoading="bigLoading" text="请稍等..."></big-loading>
  </div>
</template>

<script>
export default {
  name: 'pay',
  data () {
    let oldSignId = this.$route.query.oldSignId || null
    return {
      bigLoading: false,
      oldSignId: oldSignId
    }
  },
  created () {
    let signId = this.$route.query.signId || null
    if (signId) { this.$localStorage('signId', signId) }
  },
  methods: {
    wxPay () {
      this.bigLoading = true
      // 小小金融公众号支付要用到oldSignId
      let form = { templateId: this.$route.query.tempId }
      if (this.oldSignId) form['oldSignId'] = this.oldSignId
      this.$ajax({
        url: '/animation/payCard',
        data: form,
        success: data => {
          this.bigLoading = false
          // 没有关注公众号就去关注页 subscribe=1为关注
          // autoReg 是否是自动注册的用户，为1 说明他没有设置名片信息
          let subscribe = Number(data.attr.subscribe)
          let autoReg = Number(data.attr.autoReg)
          this.$store.commit('setScribe', subscribe)
          this.$store.commit('setReg', autoReg)
          this.$wxPay(data.attr.payParams, 'xxcard', autoReg, subscribe)
        },
        fail: (err) => {
          // err.message 已购买过这套模板
          this.bigLoading = false
          this.$messagebox.confirm(err.message || '支付失败').then(action => {
            if (action === 'confirm') {
              this.$router.back()
            }
          })
        }
      })
    }
  }
}
</script>
