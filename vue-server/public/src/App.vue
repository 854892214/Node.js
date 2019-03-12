<template>
  <div class="app-container">
    <!--  src/App.vue -->
    <!-- 1:添加公共组件 Home.vue/Header-->
    <mt-header fixed title="学子商城"></mt-header>
    <!-- 2:占位符用来显示其它的组 55-->
    <router-view></router-view>
    <!-- 3:添加公共组件 Home.vue/tabbar-->
    <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item mui-active" href="#tabbar">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-chat">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-contact">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <!-- App.vue 21 line-->
          <span class="mui-badge">AAA</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-map">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </a>
    </nav>
  </div>
</template>
