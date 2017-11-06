<template>
  <div class="error-box">
    <div class="error-text">哎呀...页面开小差了...</div>
    <button class="error-back-btn" @click="backHome">首页</button>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  methods: {
    backHome () {
      this.$router.replace('/')
    }
  }
}
</script>
