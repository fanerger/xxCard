<template>
  <div class="detail-box" v-if="swiperShow" id="detail" ref="detail">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item,index in pageList" :key="index" :style="item.backgroundImgStyle">
        <img v-for="subItem,subIndex in item['pageContent']" :class="subItem.cls" :src="subItem.img" :style="subItem.style" :key="subIndex" swiper-animate-duration="0.2s" swiper-animate-delay="0s">
      </swiper-slide>
      <swiper-slide :style="backgroundImgStyle">
        <div class="swiper-user">
          <img class="swiper-user__avatar" :src="userInfo.headImgUrl || require('@/assets/images/404_img.png')">
          <p class="swiper-user__name">{{userInfo.userName}}</p>
          <p class="swiper-user__company">{{userInfo.company}}</p>
          <p class="swiper-user__text">{{userInfo.personDesc}}</p>
          <p class="swiper-user__tel">有需要的请联系: <a :href="'tel:' + userInfo.telephone">{{userInfo.telephone}}</a></p>
        </div>
        <button class="swiper-pay__btn default__btn" @click="payCard" v-if="!(!isFromShare && isBought > 0)">一元制作我的名片</button>
      </swiper-slide>
    </swiper>
    <audio id="audio" ref="myAudio" :src="backgroundMusic" autoplay="autoplay" loop></audio>
    <button class="swiper-voice__btn" :class="musicStatus" @click.stop="playAudio"></button>
    <img class="swiper-arrow__icon" :src="arrowImg" v-show="index !== pageList.length">
  </div>
</template>

<script>
// 公众号配置 gzhCode 9房地产 10保保助手 11小小金融
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import wxShare from '../mixin/wxShare.js'
var xxUrl = window.location.origin
export default {
  name: 'list',
  mixins: [wxShare],
  data () {
    const onSlideChangeEnd = swiper => {
      this.swiperChange(swiper.realIndex)
    }
    let tempId = this.$route.query.tempId
    let companys = this.$store.state.companys
    return {
      companys: companys,
      isBought: 0,
      title: '',
      isFromShare: false,
      gzhCode: 9,
      tempId,
      swiperShow: false,
      swiperOption: {
        direction: 'vertical',
        loop: false,
        onSlideChangeEnd
      },
      index: 0,
      pageSize: 0,
      arrowImg: require('@/assets/images/arrow.png'),
      backgroundMusic: 'http://qqbxw.b0.upaiyun.com/2qbx/h5/201709049/ea041595589743b6a9cb3c38dc456a89.mp3',
      backgroundImgStyle: `background: url(${require('@/assets/images/detail_bg.jpg')}) no-repeat;background-size: 100% 100%;`,
      musicStatus: 'swiper-voice__ani',
      pageList: [],
      userInfo: {}
    }
  },
  beforeCreate () {
    // 音乐自动播放
    document.addEventListener('WeixinJSBridgeReady', function () {
      var audio = document.getElementById('audio')
      audio.play()
    }, false)
  },
  created () {
    let signId = this.$route.query.signId || ''
    if (signId) { this.$localStorage('signId', signId) }
    this.getInfo()
  },
  mounted () {
    // 音乐触摸后播放
    var that = this
    if (!this.$route.query.gzhCode) {
      window.addEventListener('touchstart', function () {
        let music = window.document.getElementById('audio')
        if (that.$route.name === 'Details' && music.paused && that.musicStatus === 'swiper-voice__ani') {
          music.play()
        }
      }, false)
    }
  },
  methods: {
    xxLogin (custId, gzhCode) {
      if (custId || gzhCode) {
        // 分享页进来的标识 isFromShare
        this.isFromShare = true
        // 小小金融分享页进来先进行授权（因为小小金融点一元换购按钮时要进行房地产的授权，所有先授权小小金融获得signid）
        if (Number(gzhCode) === 11 && !this.$route.query.signId) {
          this.$ajax({
            url: '/animation/getAuthUrl',
            data: {gzhCode: 11, shareUrl: `${xxUrl}/xxcard/details?tempId=${this.tempId}!custId=${custId}`},
            success: data => {
              let authUrl = data.attr.authUrl
              window.location.href = authUrl
            }
          })
        }
      }
    },
    getInfo () {
      // 如果从分享链接进来会带参数 custId gzhCode
      let data = { templateId: this.tempId }
      let custId = this.$route.query.custId
      let gzhCode = this.$route.query.gzhCode
      if (custId) data['custId'] = custId
      if (gzhCode) {
        data['gzhCode'] = gzhCode
        this.gzhCode = gzhCode
      }
      this.xxLogin(custId, gzhCode)
      this.$ajax({
        url: '/animation/pageList',
        data: data,
        success: res => {
          let attr = res.attr
          let tempInfo = attr.tempInfo
          this.title = tempInfo['title']
          let userInfo = attr.userInfo
          let pageList = res.rows
          pageList.map((item, index) => {
            if (item['pageContent']) {
              item['pageContent'].map(subItem => {
                if (index === 0) {
                  subItem['cls'] = subItem['class']
                } else {
                  subItem['cls'] = 'hide'
                }
              })
            }
          })
          this.backgroundMusic = tempInfo['backgroundMusic']
          this.pageSize = pageList.length
          this.pageList = pageList
          this.swiperShow = true
          // 设置页面的其他信息
          this.setPage(userInfo, tempInfo)
          // 设置分享信息
          this.setShare(this.userInfo)
        }
      })
    },
    setPage (userInfo, tempInfo) {
      if (userInfo.gzhCode) {
        this.gzhCode = Number(userInfo.gzhCode)
        this.$sessionStorage('gzhCode', userInfo.gzhCode)
      }
      if (tempInfo.hasOwnProperty('isBought') && tempInfo.isBought > 0) {
        this.isBought = tempInfo.isBought
        // 用户购买了就展示用户的名片
        this.userInfo = userInfo
      } else {
        // 用户没购买就用公众号信息
        this.userInfo = this.companys[this.gzhCode - 9]
      }
    },
    // 设置分享信息
    setShare (userInfo) {
      let custId = userInfo.customerId || ''
      let shareInfo = {
        title: this.title,
        desc: `联系方式: ${userInfo.userName}\n${userInfo.telephone}`,
        link: `https://phone.xxjr.com/xxcard/details?tempId=${this.tempId}&custId=${custId}&gzhCode=${this.gzhCode}`,
        imgUrl: userInfo.headImgUrl || this.companys[Number(userInfo.gzhCode) - 9]['headImgUrl']
      }
      this.weChatShare(shareInfo)
    },
    // 播放音乐控制
    playAudio () {
      let music = this.$refs['myAudio']
      if (music.paused) {
        music.play()
        this.musicStatus = 'swiper-voice__ani'
      } else {
        music.pause()
        this.musicStatus = ''
      }
    },
    // 滑块改变时监听
    swiperChange (page) {
      if (page !== this.pageSize) {
        let index = this.index
        let p = this.index = page
        if (index !== this.pageSize) {
          this.pageList[index]['pageContent'].map(item => {
            item['cls'] = 'hide'
          })
        }
        this.pageList[p]['pageContent'].map(item => {
          item['cls'] = item['class']
        })
      } else {
        let index = this.index
        this.index = page
        this.pageList[index]['pageContent'].map(item => {
          item['cls'] = 'hide'
        })
      }
    },
    payCard () {
      // 从分享页进来 或者是小小金融时进行房地产公众号的授权（因为小小金融用的是房地产的支付）小小金融就多传个oldSignId
      if (this.gzhCode === 11 || this.isFromShare) {
        let form = {gzhCode: this.gzhCode, shareUrl: `${xxUrl}/xxcard/pay?tempId=${this.tempId}`}
        if (this.gzhCode === 11) {
          form['shareUrl'] = `${xxUrl}/xxcard/pay?tempId=${this.tempId}!oldSignId=${this.$localStorage('signId')}`
        }
        this.$ajax({
          url: '/animation/getAuthUrl',
          data: form,
          success: data => {
            let authUrl = data.attr.authUrl
            window.location.href = authUrl
          }
        })
      } else {
        this.$router.push(`/pay?tempId=${this.tempId}`)
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
