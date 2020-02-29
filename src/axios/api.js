import {service, downloadService} from './request'
// import store from '../store/store.js'

// 登录
export const getLogin = data => { return service({method: 'post', url: '/login', data, headers: {'Content-Type': 'multipart/form-data'}}) }

/**
 * 访客记录
 */
export const listRecord = (data) => { return service({method: 'post', url: '/record/listRecord', data, headers: {'Content-Type': 'application/json'}}) }
export const exportRecord = (data) => { return downloadService({method: 'post', responseType: 'blob', url: '/record/dataExport', data, headers: {'Content-Type': 'application/json'}}) }

// 上传图片
// export const imgUpload = (data) => { return service({method: 'post', url: '/upload/imgUpload', data, headers: {'Content-Type': 'multipart/form-data'}}) }

/**
 * 被访者记录
 */
export const listVisited = (data) => { return service({method: 'post', url: '/visited/listVisited', data, headers: {'Content-Type': 'application/json'}}) }
export const deleteVisited = data => { return service({method: 'post', url: '/visited/deleteVisited', data, headers: {'Content-Type': 'multipart/form-data'}}) }
/**
 * 发布规则
 */
export const addMail = (data) => { return service({method: 'post', url: '/mail/addMail', data, headers: {'Content-Type': 'application/json'}}) }
export const listMail = (data) => { return service({method: 'post', url: '/mail/listMail', data, headers: {'Content-Type': 'application/json'}}) }
