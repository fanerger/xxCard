<template>
  <div class="followPage">
    <div class="follow-top">
      <div class="pay-success">支付成功</div>
    </div>
    <div class="qr-code">
      <img :src="codeImg" alt="">
    </div>
    <p class="follow-txt">长按关注公众号，完善名片信息</p>
    <div class="follow-tips">
      <p>1、公众号菜单中找到【动态名片】</p>
      <p>2、修改你的名片信息</p>
      <p>3、分享“购买记录”中的名片</p>
      <p>3、如有问题请直接到公众号咨询</p>
    </div>
  </div>
</template>

<script>
const qrcode = [
  {gzh: 9, code: require('@/assets/images/house_code.jpg')},
  {gzh: 10, code: require('@/assets/images/bbzs_code.jpg')},
  {gzh: 11, code: require('@/assets/images/xxjr_qrcode.jpg')}
]
export default {
  name: 'follow',
  data () {
    return {
      codeImg: ''
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
.followPage {
  .qr-code{
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 2.5rem;
    left: 1.7rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
  .follow-top{
    padding-top: 1rem;
    background: #06BC07;
    height: 2rem;
    position: relative;
    margin-bottom: 3rem;
    .pay-success{
      line-height: .6rem;
      background: url(../assets/images/pay_success.png) no-repeat left center;
      background-size: .6rem;
      padding-left: .7rem;
      width: 1.32rem;
      margin: 0 auto;
      color: #fff;
      font-size: .3rem;
    }
  }
  .follow-txt{
    font-size: .3rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: .5rem;
  }
  .follow-tips{
    padding: 0 .2rem;
  }
</style>
