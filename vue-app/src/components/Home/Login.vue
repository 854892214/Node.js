<template>
<div class="mui-content">
    <form id="login-form" class="mui-input-group">
        <div class="mui-input-row">
            <label>账号</label>
            <input id="account" type="text" class="mui-input-clear mui-input" placeholder="请输入账号" name="uname" v-model="uname" autofocus="autofocus">
        </div>
        <div class="mui-input-row">
            <label>密码</label>
            <input id="password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码" name="upwd" v-model="upwd">
        </div>
    </form>
    <form class="mui-input-group">
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
                自动登录
                <span></span>
                <div class="mui-switch mui-switch-blue mui-active">
                    <div class="mui-switch-handle"></div>
                </div>
            </li>
        </ul>
    </form>
    <div class="mui-content-padded">
        <button id="login" type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="goodAdd">登录</button>
        <div class="link-area">
            <a id="reg">注册账号</a>
            <span class="spliter">|</span>
            <a id="forgetPassword">忘记密码</a>
        </div>
    </div>
    <div class="mui-content-padded oauth-area"></div>
</div>
</template>

<script>
import {
    Toast
} from "mint-ui";
export default {
    data() {
        return {
            uname: "",
            upwd: ""
        };
    },
    methods: {
        goodAdd() {
            var u = this.uname;
            var p = this.upwd;
            var reg = /^[a-z0-p]{2,8}$/;
            if (!reg.test(u)) {
                return Toast("输入的用户名不正确");
            }
            var url = "http://127.0.0.1:3000/login?uname=" + u + "&upwd=" + p;
            this.axios.get(url).then(result => {
              console.log(result)
                if (result.data.code == 1) {
                    this.$router.push("/Home");
                } else {
                    Toast("登录失败,用户名或密码有误！");
                }
            });
        }
    },
    created() {
        this.$store.commit('updateCount', 0)
    }
};
</script>

    
<style>
.mui-content {
    margin-top: 50px;
}

.area {
    margin: 20px auto 0px auto;
}

.mui-input-group {
    margin-top: 10px;
}

.mui-input-group:first-child {
    margin-top: 20px;
}

.mui-input-group label {
    width: 22%;
}

.mui-input-row label~input,
.mui-input-row label~select,
.mui-input-row label~textarea {
    width: 78%;
}

.mui-checkbox input[type="checkbox"],
.mui-radio input[type="radio"] {
    top: 6px;
}

.mui-content-padded {
    margin-top: 25px;
}

.mui-btn {
    padding: 10px;
}

.link-area {
    display: block;
    margin-top: 25px;
    text-align: center;
}

.spliter {
    color: #bbb;
    padding: 0px 8px;
}

.oauth-area {
    position: absolute;
    bottom: 20px;
    left: 0px;
    text-align: center;
    width: 100%;
    padding: 0px;
    margin: 0px;
}

.oauth-area .oauth-btn {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 30px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0px 20px;
    /*-webkit-filter: grayscale(100%); */
    border: solid 1px #ddd;
    border-radius: 25px;
}

.oauth-area .oauth-btn:active {
    border: solid 1px #aaa;
}

.oauth-area .oauth-btn.disabled {
    background-color: #ddd;
}
</style>
