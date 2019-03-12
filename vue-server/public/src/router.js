import Vue from "vue"
import Router from "vue-router"
import Home from "./components/tab/Home.vue"
import Login from "./components/Home/Login.vue"
Vue.use(Router)
export default new Router({
    routes:[
        {path:'/',redirect:"Home"},
        {path:'/Home',component:Home},
        {path:'/Login',component:Login}
    ]
});