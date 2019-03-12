import Vue from "vue"
import Router from "vue-router"
import Home from "./components/tab/Home.vue"
import Login from "./components/Home/Login.vue"
import NewsList from "./components/NewList/NewsList.vue"
import NewsInfo from "./components/NewList/NewsInfo.vue"
import GoodsList from "./components/GoodList/GoodsList.vue"
import GoodInfo from "./components/GoodList/GoodInfo.vue"
import ShopCart from "./components/GoodList/ShopCart.vue"
Vue.use(Router)
export default new Router({
    routes: [
        { path: '/', redirect: "Home" },
        { path: '/Home', component: Home },
        { path: '/Login', component: Login },
        { path: '/NewsList', component: NewsList },
        { path: '/NewsInfo', component: NewsInfo },
        { path: '/GoodsList', component: GoodsList },
        { path: '/GoodInfo', component: GoodInfo },
        { path: '/ShopCart', component: ShopCart },
        { path: '*', component: Login },
    ]
});