import vue from "vue"
import vuex from "vuex"
vue.use(vuex)
// import { stat } from "fs";
const store = new vuex.Store({
    state: {
        userId: sessionStorage.getItem('userId'),
        CartCount: sessionStorage.getItem('CartCount') || 0
    },
    mutations: {
        userId(state, userId) {
            state.userId = userId;
            sessionStorage.setItem('userId', userId)
        },
        increment(state) {
            state.CartCount++
        },
        updateCount(state, count) {
            state.CartCount = count
            sessionStorage.setItem("CartCount", count)
        }
    },
    getters: {
        userId: function (state) {
            return state.userId;
        },
        optCartCount: function (state) {
            return state.CartCount
        }
    }
})
export default store