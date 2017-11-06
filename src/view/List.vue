<template>
<div style="padding-bottom:.8rem;">
  <ul class="list-box clearfix" v-infinite-scroll="search" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <li class="list-item fl" @click="jumpDetail(item.templateId)" v-for="item,index in listData" :key="index">
      <img class="item__img" :src="item.coverUrl">
      <p class="item__text ellipsis">{{item.title}}</p>
      <span class="is-bought" v-if="item.isBought > 0">已购</span>
    </li>
  </ul>
  <p v-show="loadingImg" class="page-infinite-loading">
      <mt-spinner type="snake" color="#247FC5"></mt-spinner>
    </p>
    <div class="no-resulte" v-show="noResult">
      <div class="publish-text">暂无数据~</div>
    </div>
    <p v-show="isOver" class="load-down">--加载完毕--</p>
  <tab-bar></tab-bar>
</div>
</template>

<script>
let u = navigator.userAgent
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
const queryList = require('../utils/queryList.js')
import TabBar from '@/components/TabBar'
export default {
  name: 'list',
  data () {
    return queryList.queryParam
  },
  beforeCreate () {
    let gzhCode = this.$route.query.gzhCode || ''
    if (gzhCode) this.$sessionStorage('gzhCode', gzhCode)
    let signId = this.$route.query.signId || ''
    if (signId) this.$localStorage('signId', signId)
    // 隐藏那些分享按钮
    // function onBridgeReady () {
    //   window.WeixinJSBridge.call('hideOptionMenu')
    // }
    // if (typeof window.WeixinJSBridge === 'undefined') {
    //   if (document.addEventListener) {
    //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    //   } else if (document.attachEvent) {
    //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
    //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    //   }
    // } else {
    //   onBridgeReady()
    // }
  },
  created () {
    this.search(1)
  },
  methods: {
    search (page) {
      queryList.search('/animation/templateList', page, this)
    },
    jumpDetail (tempId) {
      // ios第一次进入详情页强刷
      if (isiOS && !this.$sessionStorage('refresh')) {
        this.$sessionStorage('refresh', 1)
        window.location.href = `${window.location.origin}/xxcard/details?tempId=${tempId}`
      } else {
        this.$router.push({
          path: '/details',
          query: { tempId }
        })
      }
    }
  },
  components: { TabBar }
}
</script>
