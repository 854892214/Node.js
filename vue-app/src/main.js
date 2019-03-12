import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import vuex from "vuex"
//import "mint-ui"
//1:引入mint-ui 样式文件
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
//2:引入 mui库样式文件
//import './lib/mui/js/mui.min.js'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import { Header, Swipe, SwipeItem, Button } from "mint-ui"
Vue.use(vuex)
var store = new vuex.Store({
  state: {
    CartCount: sessionStorage.getItem('CartCount') || 0
  },
  mutations: {
    increment(state) {
      state.CartCount++
    },
    updateCount(state, count) {
      state.CartCount = count
      sessionStorage.setItem("CartCount", count)
    }
  },
  getters: {
    optCartCount: function (state) {
      return state.CartCount
    }
  }
})
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
import qs from "qs"
import axios from "axios"
Vue.prototype.axios = axios;
//6:配置跨域访问保存session
axios.defaults.withCredentials = true;
Vue.prototype.qs = qs;
Vue.filter("datetimeFilter", function (val) {
  var date = new Date(val);
  var y = date.getFullYear();
  var m = date.getMonth();
  var d = date.getDay();
  var h = date.getHours();
  var mi = date.getMinutes();
  var s = date.getSeconds();
  m < 10 && (m = "0" + m);
  d < 10 && (d = "0" + d);
  return `${y}-${m}-${d} ${h}-${mi}-${s}`;
})
//9:创建日期过滤器
Vue.filter("dateFilter", function (val) {
  //1:获取新日期对象
  var date = new Date(val);
  //2:获取新日期对象 年 月+1 日 
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  //3:返回字符串
  return `${y}-${m}-${d}`;
})
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app');