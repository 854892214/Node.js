<template>
  <div class="app-cart">
    <div class="mui-card" v-if="isId&&list.length>0">
      <div class="mui-card-header">
        <h3>购物车列表</h3>
        <h4>
          <!--allcb 全选状态true选中false清空-->
          全选
          <input type="checkbox" @click="selectAll" :checked="allcb">
        </h4>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item,i) in list" :key="item.id">
              <a href="javascript:;">
                <img class="mui-media-object mui-pull-left">
                <div class="mui-media-body">
                  <p class="mui-ellipsis">
                    <!-- 购物车中商品项目 home/ShopCart.vue start-->
                    <input type="checkbox" :checked="item.cb" :data-i="i" @click="modifyItem">
                    {{item.lname}}
                    {{item.price}}
                    <!--delItem处理删除商品函数-->
                    <!--data-id 当前购物车id-->
                    <!--data-idx 当前商品下标list-->
                    <button @click="delItem" :data-id="item.id" :data-idx="i">删除</button>
                    <!-- 购物车中商品项目 end-->
                  </p>
                </div>
              </a>
              <form class="mui-input-group">
                <div class="mui-input-row">
                  <div class="mui-numbox">
                    <button
                      class="mui-btn mui-btn-numbox-minus"
                      type="button"
                      @click="minCount(i)"
                    >-</button>
                    <input class="mui-input-numbox" type="number" v-model="item.count">
                    <button class="mui-btn mui-btn-numbox-plus" type="button" @click="addCount(i)">+</button>
                  </div>
                </div>
              </form>
            </li>
          </ul>
        </div>
      </div>
      <div class="mui-card-footer">
        <button @click="removeItem">删除选中商品</button>
        <p>小计:￥{{calcTocalPrice()}}</p>
      </div>
      <div class="mui-card-footer">
        <button @click="jumpCart">去支付</button>
      </div>
    </div>
    <div v-if="isId==false">
      <p>抱歉，请您先登录吧</p>
    </div>
    <div v-if="list.length==0">
      <h3>购物车是空的，逛逛去吧！</h3>
      <button @click="jump">逛逛</button>
    </div>
  </div>
</template>
<script>
//ShopCart.vue 当组件创建成功发送 ajax请求
//获取购物车列表
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      list: [],     //页面初始化数组
      cb: false,    //保存单个商品的复选框状态
      allcb: false, //保存全选复选框状态
      isId: true    //判断用户是否登录
    };
  },
  methods: {
    //删除一项商品
    delItem(e) {
      //e事件对象 e.target 触发事件对象button
      //target.dataset 自定义属性集合
      //1:获取当前购物车id
      var id = e.target.dataset.id;
      var idx = e.target.dataset.idx; //下标
      //2:发送ajax请求
      var url = "http://127.0.0.1:3000/";
      url += "delCartItem?id=" + id;
      this.axios.get(url).then(result => {
        if (result.data.code == 1) {
          //3:获取返回结果判断是否删除成功
          Toast("删除成功");
          //4:删除list对应购物车商品对象
          //将数组中对应下标商品删除
          //splice(数组下标,个数); 10:35
          this.list.splice(idx, 1);
        }
      });
    },
    //页面加载 初始化数据
    loadMore() {
      //1:创建变量保存url
      var url = "http://127.0.0.1:3000/";
      url += "cartlist?uid=1";
      //2:发送ajax请求
      this.axios.get(url).then(result => {
        //1:判断如果没有登录显示出错消息
        if (result.data.code == -1) {
          Toast("请登录");
          this.isId = false;
          return;
        }
        //1:2 没有与 vue data双向绑定
        //1:接收服务器程序返回数据
        //ShopCart.vue
        var rows = result.data.data;
        //修改全局购物车数量
        this.$store.commit("updateCount", rows.length);
        //2:为每一个商品对象添加属性cb 选中状态
        for (var item of rows) {
          item.cb = false;
        }
        //3:将最终数组赋值 list 列表
        this.list = rows;
        console.log(this.list);
      });
    },
    //点击全选 选中全部商品
    selectAll(e) {
      //全选按钮点击事件
      //1:获取当前全选复选框状态
      var cb = e.target.checked;
      //2:修改全选状态
      this.allcb = cb;
      //2:依据全选状态修改数组中cb值
      for (var item of this.list) {
        item.cb = cb;
      }
    },
    //全选checked判断是否true/false
    modifyItem(e) {
      //修改
      //1:获取当前元素下标[其中一种方式]
      var idx = e.target.dataset.i;
      //2:将下标对象数组中元素cb修改当前复选状态
      var checked = e.target.checked;
      //3:将数组中对应cb状态修改
      this.list[idx].cb = checked;
      //4:统计购物车中商品选中数量 == list.length
      //5:将全选状态修改为true否则为 false
      var count = 0;
      for (var item of this.list) {
        if (item.cb) {
          count++;
        }
      }
      if (count == this.list.length) {
        this.allcb = true;
      } else {
        this.allcb = false;
      }
    },
    //删除选中的购物车商品
    removeItem() {
      //0:创建空字符串，为了后续接拼字符串
      var html = "";
      //1:遍历数组中元素
      for (var item of this.list) {
        //2:判断cb==true
        if (item.cb) {
          //3:保存id：拼字符串
          html += item.id + ",";
        }
      }
      //3.1:截取字符串  试一下  三 二 一
      html = html.substring(0, html.length - 1);
      //4:发送ajax请求 删除多个商品
      var url = "http://127.0.0.1:3000/";
      url += "removeMItem?ids=" + html;
      this.axios.get(url).then(result => {
        if (result.data.code == 1) {
          Toast("删除成功");
          this.loadMore();
        }
      });
    },
    // 指定一个方法 计算合计消费的金额
    calcTocalPrice() {
      var sum = 0;
      var row = this.list;
      for (var i = 0; i < row.length; i++) {
        var p = row[i];
        if (p.cb) {
          sum += p.price * p.count;
        }
      }
      return sum;
    },
    //点击-按钮，购物商品减1
    minCount(index) {
      if (this.list[index].count == 1) {
        return;
      }
      this.list[index].count--;
    },
    //点击+按钮，购物商品加1
    addCount(index) {
      this.list[index].count++;
    },
    //跳转到商品组件
    jump() {
      this.$router.push("GoodsList");
    },
    //跳转到购物车
    jumpCart(){
      this.$router.push('OrderConfirm')
    }
  },
  created() {
    this.loadMore();
  }
};
</script>
<style>
</style>