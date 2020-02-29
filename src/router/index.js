/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import layout from '@/components/common/layout'
import visitor from '@/components/visitor/index.vue'
import respondents from '@/components/respondents/index.vue'
import releasRule from '@/components/releas/index.vue'
import Error from '@/components/Error'
import Overtime from '@/components/Overtime'

// const Login = () => import('@/components/Login')
// const layout = () => import('@/components/layout')
// const visitor = () => import('@/components/StaffManage/Visitor')
// const home = () => import('@/components/home')
// const Error = () => import('@/components/Error')
// const Overtime = () => import('@/components/Overtime')

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: { name: 'Login' }
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/visitor',
      component: layout,
      children: [
        {
          path: 'visitor',
          name: 'visitor',
          component: visitor
        },
        {
          path: 'respondents',
          name: 'respondents',
          component: respondents
        },
        {
          path: 'releas/rule',
          name: 'releasRule',
          component: releasRule
        }
      ]
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
    {
      path: '/overtime',
      name: 'Overtime',
      component: Overtime
    }
  ]
})
