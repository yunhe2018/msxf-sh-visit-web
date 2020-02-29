import axios from 'axios'
import consts from '../lib/constant.js'
import router from '../router'
import { showLoading, hideLoading } from './loading'
axios.defaults.withCredentials = true
axios.defaults.baseURL = consts.apiPrefix

function axioInterceptor (instance) {
  // http request 拦截器
  instance.interceptors.request.use(
    config => {
      if (!/\/(strangerCount|blackCount|export|dataExport)$/.test(config.url)) {
        showLoading()
      }
      const sessionId = sessionStorage.getItem('sessionId') ? sessionStorage.getItem('sessionId') : ''
      if (sessionId) {
        config.headers.sessionId = sessionId
      }
      return config
    },
    err => {
      hideLoading()
      return Promise.reject(err)
    }
  )
  // http response 拦截器
  instance.interceptors.response.use(
    response => {
      if (!/\/(strangerCount|blackCount|export|dataExport)$/.test(response.config.url)) {
        hideLoading()
      }
      if (response.data.code === '1001' && !/\/record\/strangerCount/.test(response.config.url)) {
        // 只有在当前路由不是登录页面才跳转
        if (!/login/.test(router.currentRoute.path)) {
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.path }
          })
          // response.data.message = '登录失效'
          return Promise.reject(response)
        }
      }
      return response
    },
    error => {
      hideLoading()
      console.log(error)
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 401 清除token信息并跳转到登录页面
          //   store.commit(types.LOGOUT)
            // 只有在当前路由不是登录页面才跳转
            if (!/login/.test(router.currentRoute.path)) {
              console.log(3)
              router.replace({
                path: 'overtime',
                query: { redirect: router.currentRoute.path }
              })
            }
        }
      }
      // else {
      //   if (!/\/(strangerCount|blackCount)$/.test(router.currentRoute.path)) {
      //     Message.error({
      //       message: '请求超时'
      //     })
      //   }
      // }
      return Promise.reject(error)
    }
  )
}
export const service = axios.create({
  timeout: 5000
})
export const downloadService = axios.create()
axioInterceptor(downloadService)
axioInterceptor(service)
