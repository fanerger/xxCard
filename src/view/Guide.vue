<template>
  <div class="guidePage">
    <h3>请先观看操作流程示意图</h3>
    <div class="guide-img">
      <img :src="codeImg" alt="">
    </div>
    <button class="default__btn margin_auto" @click="next()">我已清楚操作流程，点击进入下一步</button>
    <div class="follow-tips">
      <p>1、公众号菜单中找到【动态名片】</p>
      <p>2、修改你的名片信息</p>
      <p>3、分享“购买记录”中的名片</p>
      <p>4、如有问题请直接到公众号咨询</p>
    </div>
  </div>
</template>

<script>
const qrcode = [
  { gzh: 9, code: require('@/assets/images/guide_fang.gif') },
  { gzh: 10, code: require('@/assets/images/guide_bbzs.gif') },
  { gzh: 11, code: require('@/assets/images/guide_xxjr.gif') }
]
export default {
  name: 'follow',
  data () {
    let subscribe = this.$store.state.subscribe
    return {
      codeImg: '',
      subscribe: subscribe
    }
  },
  methods: {
    next () {
      if (this.subscribe !== 1) {
        this.$router.push('/follow')
      } else {
        this.$router.push('/user')
      }
    }
  },
  created () {
    let gzhCode = this.$sessionStorage('gzhCode') || 9
    for (let i = 0; i < qrcode.length; i++) {
      if (qrcode[i]['gzh'] === Number(gzhCode)) {
        this.codeImg = qrcode[i]['code']
      }
    }
  }
}
</script>
<style lang="less">
.guidePage{
  background: #f2f2f2;
}
.guidePage h3{
  font-size: .26rem;
  text-align: center;
}
.guide-img{
  text-align: center;
}
.margin_auto{
  display: block;
  margin:  0 auto;
}
.guide-img img{
  width: 5rem;
}
.follow-tips{
  padding: 0 .2rem;
}
</style>
