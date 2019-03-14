<template>
  <div>
    <!-- 头信息 -->
    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
      <li class="mui-table-view-cell">
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <h4 class="mui-ellipsis"></h4>
            <h5>
              <a id="icon-location" style="position:relative;top:0.5rem">
                <span class="mui-icon mui-icon-location" style="font-size:24px"></span>
              </a>
              收货人：李四
            </h5>
            <p class="mui-h6 mui-ellipsis">收货地址:上海市闵行区龙茗路2680号</p>
          </div>
          <div class="mui-table-cell mui-col-xs-2 mui-text-right">
            <span class="mui-h5">12:25</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- 已购的商品列表 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img
            class="mui-media-object mui-pull-left"
            src="../../img/myCollect/product_img1.png"
            style="height: 73px!important;max-width:81px!important;"
          >
          <div class="mui-media-body">幸福
            <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
            <p style="color:red">6808x3</p>
          </div>
        </a>
      </li>
    </ul>
    <!-- 立即支付按钮 -->
    <div class="mui-content-padded" @click="jumo">
      <button
        type="button"
        class="mui-btn mui-btn-danger mui-btn-block"
        style="position:fixed;top:35rem"
        @click="jump"
      >立即支付</button>
    </div>
    <mt-popup v-model="popupVisible" @click="!popupVisible" position="bottom" style="width:100%;">
      <div style="height:200px;background:#ddd">
        <div class="paypwd">
          <span>X</span>
          <span style="font-size:24px;">请输入支付密码</span>
          <div></div>
        </div>
        <hr style="width:100%">
        <div class="payinfo">
          <span style="font-size:22px;padding:10px">你是风儿</span>
          <span style="font-size:34px">￥588.6</span>
        </div>
        <hr style="width:90%;text-align:center">
        <div class="paytype">
          <span>
            <img src="../../img/wx/logo.png" style="width:30px;position:relative;top:5px">
            零钱
          </span>
          <span class="mui-icon mui-icon-arrowright" @click="ShowSel">
            <mt-popup v-model="popupSel" popup-transition="popup-fade" style="width:90%">
              <mt-radio title="请选择银行卡" v-model="str" :options="list"></mt-radio>
            </mt-popup>
          </span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
export default {
  name: "release",
  data() {
    return {
      popupVisible: false,
      popupSel: false,
      str: "",
      list: [
        "邮储银行储蓄卡(7404)",
        "中国银行储蓄卡(0098)",
        "邮储银行储蓄卡(8019)",
        "邮储银行储蓄卡(5773)",
        "使用新卡充值"
      ]
    };
  },
  methods: {
    jumo() {
      Indicator.open({
        text: "正在加载...",
        spinnerType: "fading-circle"
      });
      setTimeout(() => {
        Indicator.close();
        Toast("加载完成");
      }, 2000);
    },
    jump() {
      this.popupVisible = !this.popupVisible;
    },
    ShowSel() {
      this.popupSel = !this.popupSel;
    }
  }
};
</script>

<style>
/*跨webview需要手动指定位置*/
.mui-plus header.mui-bar {
  display: none !important;
}
.mui-plus .mui-bar-nav ~ .mui-content {
  padding: 0 !important;
}
.mui-plus .plus {
  display: inline;
}
.plus {
  display: none;
}
#topPopover {
  position: fixed;
  top: 16px;
  right: 6px;
}
#topPopover .mui-popover-arrow {
  left: auto;
  right: 6px;
}
p {
  text-indent: 22px;
}
.mui-popover {
  height: 300px;
}
.mui-content {
  padding: 10px;
}
.paypwd {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 10px;
}
.payinfo {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.paytype {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 15px;
  font-size: 24px;
}
</style>