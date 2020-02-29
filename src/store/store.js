import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 初始化全局的一个变量
    userName: '',
    pageTitle: '',
    visitorDownloading: false
  },
  mutations: {
    modifyTips (state, userName) {
      state.userName = userName
    },
    visitorDownloadingShow (state, visitorDownloading) {
      state.visitorDownloading = true
    },
    visitorDownloadingHide (state, visitorDownloading) {
      state.visitorDownloading = false
    }
  }
})
export default store
