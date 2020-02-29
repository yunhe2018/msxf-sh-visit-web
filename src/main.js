/* eslint-disable no-redeclare */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import store from './store/store.js'
import globalConst from './lib/constant.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$globalConst = globalConst

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('sessionId')) {
      next()
    } else {
      next({
        path: '/login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: { redirect: router.currentRoute.path }
      })
    }
  } else {
    if (to.matched.length === 0) {
      next('/error')
    } else {
      next()
    }
  }
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
