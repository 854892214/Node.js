<template>
  <div class="cart-app">
    <div>
      <img src="../../img/404/404_img1.png" alt>
    </div>
    <div>
      <img src="../../img/404/404_img2.png" alt>
    </div>
    <h3>页面开发中......</h3>
    <h3 v-if="count>=1">{{count}}秒后自动返回上一页</h3>
  </div>
</template>
<style>
.cart-app {
  text-align: center;
}
</style>
<script>
export default {
  data() {
    return {
      count: 5,
      myTimer: null
    };
  },
  methods: {},
  created() {
    this.myTimer = setInterval(() => {
      if (this.count <= 1) {
        this.$router.push("home");
        return;
      }
      this.count--;
    }, 1000);
  },
  //页面离开后执行一些清理操作
  destroyed: function() {
    clearInterval(this.myTimer);
  }
};
</script>

