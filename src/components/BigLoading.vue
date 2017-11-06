<template>
  <div class="com-template" v-if="bigLoading">
    <div class="alert-content big-loading">
      <p class="page-infinite-loading">
        <mt-spinner type="snake" color="#247FC5"></mt-spinner>
      </p>
      <p class="txt">{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'big-loading',
  props: {
    text: String,
    bigLoading: Boolean
  }
}
</script>
<style lang="less">
.com-template {
  width: 100%;
  left: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  display: -webkit-flex;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  .alert-content {
    border-radius: .1rem;
    width: 4.9rem;
    background: rgba(0, 0, 0, .8);
    padding-top: .4rem;
  }
  .big-loading {
    width: 2.5rem;
    height: 2rem;
    color: #000;
    text-align: center;
    animation: none;
    .txt {
      margin-top: .3rem;
      color: #fff;
    }
  }
}
</style>
