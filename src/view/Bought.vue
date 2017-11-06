<template>
<div style="padding-bottom:.8rem;">
  <ul class="list-box clearfix" v-infinite-scroll="search" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <li class="list-item fl" @click="jumpDetail(item.templateId)" v-for="item,index in listData" :key="index">
      <img class="item__img" :src="item.coverUrl">
      <p class="item__text ellipsis">{{item.title}}</p>
    </li>
  </ul>
  <p v-show="loadingImg" class="page-infinite-loading">
    <mt-spinner type="snake" color="#247FC5"></mt-spinner>
  </p>
  <div class="no-resulte" v-show="noResult">
    <div class="text">暂无数据~</div>
  </div>
  <p v-show="isOver" class="load-down">--加载完毕--</p>
  <tab-bar></tab-bar>
</div>
</template>

<script>
const queryList = require('../utils/queryList.js')
import TabBar from '@/components/TabBar'
export default {
  name: 'list',
  data () {
    return queryList.queryParam
  },
  created () {
    this.search(1)
  },
  methods: {
    search (page) {
      queryList.search('/account/animation/queryExchangeList', page, this)
    },
    jumpDetail (tempId) {
      this.$router.push({
        path: '/details',
        query: { tempId }
      })
    }
  },
  components: { TabBar }
}
</script>
