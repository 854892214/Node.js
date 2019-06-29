<template>
  <div class="app-newslist">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id" @click="addClickNum(item.point,item.id)">
        <router-link :to="'/NewsInfo?nid='+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">
              <span>{{item.ctime | datetimeFilter}}</span>
              <span>点击{{item.point}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
    <!-- <button @add="task"></button> -->
    <!-- <news-info></news-info> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      pno: 1,
      PageSize: 7,
      str: ["吃饭", "睡觉", "打豆豆"]
    };
  },
  methods: {
    LoadList() {
      var url = "http://127.0.0.1:3000/imglist";
      this.axios.get(url).then(res => {
        this.list = res.data.msg;
      });
    },
    getMore() {
      this.pno++;
      var url =
        "http://127.0.0.1:3000/newslist?pno=" +
        this.pno +
        "&PageSize=" +
        this.PageSize;
        this.axios.get(url).then(res => {
        var rows = this.list.concat(res.data.data);
        this.list = rows;
      });
    },
    addClickNum(point,id){
      let url="http://127.0.0.1:3000/newsInfoClick?point="+point+"&id="+id
      this.axios.get(url)
    }
    /* add() {} */
  },
  created() {
    this.LoadList();
  }
};
</script>
<style>
/*日期和点击次数两端对齐*/
.app-newslist li .mui-ellipsis {
  display: flex; /*弹性布局*/
  font-size: 12px;
  color: #226aff;
  justify-content: space-between; /*两端对齐*/
}
</style>