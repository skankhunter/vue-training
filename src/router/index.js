import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'
import Profile from "../components/User/Profile";

Vue.use(VueRouter)

const routes = [
    {
      path: '',
        name: 'home',
        component: Home
    },
    {
        path: '/ad/:id',
        name: 'ad',
        props: true,
        component: Ad
    },
    {
        path: '/list',
        name: 'list',
        component: AdList,
        beforeEnter: AuthGuard
    },
    {
        path: '/new',
        name: 'newAd',
        component: NewAd,
        beforeEnter: AuthGuard
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter: AuthGuard
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders,
        beforeEnter: AuthGuard
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
