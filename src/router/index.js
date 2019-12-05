import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/example/HelloWorld'
import MainContainer from '@/components/main/MainContainer'
import ContainerLayout from '@/components/example/ContainerLayout'
import Login from '@/components/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      mode:'history',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'MainContainer',
      meta: {
        requireAuth: true, // 判断是否需要登录
      },
      component: MainContainer
    },
    {
      path: '/containerLayout',
      name: 'ContainerLayout',
      component: ContainerLayout
    },
    {
      path: '/error',
      name: 'HelloWorld2',
      component: HelloWorld
    }
  ]
})
