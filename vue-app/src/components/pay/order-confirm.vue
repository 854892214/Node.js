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
          <div class="mui-media-body">
            幸福
            <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
            <p style="color:red">6808x3</p>
          </div>
        </a>
      </li>
    </ul>
    <!-- 立即支付按钮 -->
    <div class="mui-content-padded">
      <button
        type="button"
        class="mui-btn mui-btn-danger mui-btn-block"
        style="position:fixed;top:35rem"
        @click="jump"
      >立即支付</button>
    </div>
    <!-- 弹出立即支付模态窗 -->
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
        <!-- 弹出支付类型选项 -->
        <div class="paytype" @click="ShowSel">
          <p style="font-size:20px">
            <img src="../../img/wx/logo.png" style="width:30px;position:relative;top:5px">
            {{str}}
          </p>
          <span class="mui-icon mui-icon-arrowright"></span>
        </div>
      </div>
    </mt-popup>
    <!-- 弹出支付类型模态窗 -->
    <mt-popup
      v-model="popupSel"
      popup-transition="popup-fade"
      style="width:90%"
    >
      <mt-radio title="请选择银行卡" v-model="str" :options="list"></mt-radio>
    </mt-popup>
  </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
export default {
  name: "release",
  data() {
    return {
      popupVisible: false, //控制立即支付按钮的模态窗 的hide
      popupSel: false, //控制支付选项的模态窗的hide
      //isOpen: false,//是否支持点击modal关闭modal
      str: "",
      list: [
        "邮储银行储蓄卡(7404)",
        "中国银行储蓄卡(0098)",
        "兴业银行储蓄卡(8019)",
        "招商银行储蓄卡(5773)",
        "建设银行储蓄卡(5773)",
        "使用新卡充值"
      ]
    };
  },
  methods: {
    //点击立即支付按钮
    jump() {
      //有后台接口，可以放axios成功后执行关闭
      Indicator.open({
        text: "正在加载...",
        spinnerType: "fading-circle"
      });
      setTimeout(() => {
        Indicator.close();
        Toast("加载完成");
        if (this.str == "") this.str = "零钱";
        this.popupVisible = !this.popupVisible;
      }, 2000);
    },
    ShowSel() {
      this.popupSel = !this.popupSel;
    }
  },
  watch: {
    /* popupSel() {
      //console.log("支付类型", this.popupSel);
      //this.popupSel = true;
    }, */
    popupVisible() {
      //console.log("支付模态窗", this.popupVisible);
      this.popupSel = false;
    },
    str(val) {
      this.str = val;
      //console.log(val);
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