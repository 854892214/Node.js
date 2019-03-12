<template>
  <div class="app-newsinfo">
    <!-- 当前新闻详细信息-->
    <div class="mui-card">
      <div
        class="mui-card-header mui-card-media"
        :style="'height:40vw;background-image:url('+info.img_url+')'"
      ></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>Posted on {{info.ctime | dateFilter}}</p>
          <p style="color: #333;">{{info.content}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <a class="mui-card-link">Like</a>
        <a class="mui-card-link">Read more</a>
      </div>
    </div>
    <!-- 评论-->
    <comment-box></comment-box>
  </div>
</template>
<script>
import command from "./command.vue";
export default {
  data() {
    return {
      list: [],
      info: {}
    };
  },
  methods: {
    LoadNid() {
      var nid = this.$route.query.nid;
      var url = "http://127.0.0.1:3000/findNewsInfo?id=" + nid;
      this.axios.get(url).then(res => {
        this.list = res.data.data;
        this.info = res.data.data[0];
      });
    }
  },
  created() {
    this.LoadNid();
  },
  components: {
    "comment-box": command
  }
};
</script>
