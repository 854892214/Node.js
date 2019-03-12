import Vue from "vue"
import App from "./App.vue"
import router from "./router"
//import "mint-ui"
//1:引入mint-ui 样式文件
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
//2:引入 mui库样式文件
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
Vue.config.productionTip = false
import { Header, Swipe, SwipeItem, Button } from "mint-ui"
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
import qs from "qs"
Vue.prototype.qs = qs;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');