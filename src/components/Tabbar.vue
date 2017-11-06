<template>
  <mt-tabbar class="tabbar-box" v-model="routeName" fixed>
    <mt-tab-item id="list" class="list-item">动态名片</mt-tab-item>
    <mt-tab-item id="bought" class="bought-item">购买记录</mt-tab-item>
    <mt-tab-item id="user" class="user-item">修改名片</mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  name: 'tab-bar',
  data () {
    let routeName = this.$route.name.replace(/^\w{1}/, L => L.toLowerCase()) // 首字符小写
    return {
      routeName
    }
  },
  watch: {
    routeName (val) {
      this.$router.push(val)
    },
    $route (to) {
      this.routeName = to.name.replace(/^\w{1}/, L => L.toLowerCase())
    }
  }
}
</script>
