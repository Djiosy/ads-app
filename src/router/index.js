import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import NewAd from '@/components/Ads/NewAd'
import AdList from '@/components/Ads/AdList'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'Ad',
      component: Ad
    },
    {
      path: '/new',
      name: 'NewAd',
      component: NewAd,
      beforeEnter: AuthGuard
    },
    {
      path: '/list',
      name: 'AdList',
      component: AdList,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
