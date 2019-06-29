<template>
  <div class="app-home">
    <!--轮播图-->
    <mt-swipe>
      <mt-swipe-item v-for="item in list" :key="item.id">
        <img :src="item.img_url">
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/NewsList">
          <img src="../../img/menu1.png">
          <div class="mui-media-body">新闻咨讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/GoodsList">
          <img src="../../img/menu2.png">
          <div class="mui-media-body">商品</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/ShopCart">
          <img src="../../img/menu3.png">
          <div class="mui-media-body">购物车</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/OrderConfirm">
          <a href="#">
            <img src="../../img/menu4.png">
            <div class="mui-media-body">支付</div>
          </a>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../img/menu5.png">
          <div class="mui-media-body">搜索</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../img/menu6.png">
          <div class="mui-media-body">更多</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    LoadSwipe() {
      this.axios.get("http://127.0.0.1:3000/imagelist").then(result => {
        this.list = result.data;
      });
    },
    LoadMore() {
      var url = "http://127.0.0.1:3000/cartlist";
      this.axios.get(url).then(res => {
        var row = res.data.data;
        this.$store.commit("updateCount", row.length);
      });
    }
  },
  created() {
    this.LoadSwipe();
    this.LoadMore();
  }
};
</script>
<style>
/*轮播图*/
.app-home .mint-swipe {
  height: 200px;
}
.app-home .mint-swipe img {
  width: 100%;
}
/*九宫格  图片宽度*/
.app-home .mui-grid-9 img {
  width: 60px;
  height: 60px;
}
/*九宫格  背景修改为白色*/
.app-home .mui-grid-view.mui-grid-9 {
  background-color: #fff;
}
</style>