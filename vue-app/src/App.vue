<template>
<div class="app-container">
    <!--  src/App.vue -->
    <!-- 1:添加公共组件 Home.vue/Header-->
    <mt-header title="学子商城"></mt-header>
    <!-- 2:占位符用来显示其它的组 55-->
    <router-view></router-view>
    <!-- 3:添加公共组件 Home.vue/tabbar-->
    <nav class="mui-bar mui-bar-tab" v-show="isShowTabbar">
        <a class="mui-tab-item mui-active" @click="jump(1)">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </a>
        <a class="mui-tab-item" @click="jump(2)">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label">会员</span>
        </a>
        <a class="mui-tab-item" @click="jump(3)">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                <!-- App.vue 21 line-->
                <span class="mui-badge">{{$store.getters.optCartCount}}</span>
            </span>
            <span class="mui-tab-label">购物车</span>
        </a>
        <a class="mui-tab-item" @click="jump(4)">
            <span class="mui-icon mui-icon-search"></span>
            <span class="mui-tab-label">搜索</span>
        </a>
    </nav>
</div>
</template>

<script>
export default {
    data() {
        return {
          isShowTabbar:true
        }
    },
    methods: {
        jump(url) {
            if (url == 1) {
                this.$router.push('/home');
            } else if (url == 3) {
                this.$router.push('/ShopCart');
            }
        }
    },
    watch: {
        $route(to, from) {
            if(to.path=="/login"){
              this.isShowTabbar=false
            }else{
              this.isShowTabbar=true
            }
        }
    }
}
</script>

<style>
.lizi-contaniner {
    position: absolute;
}

/* 禁止触发默认的手势操作 */
* {
    touch-action: none;
}

.app-container {
    padding-bottom: 50px;
    overflow-x: hidden;
}

.mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
