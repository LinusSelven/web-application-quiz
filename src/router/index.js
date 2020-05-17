import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/category.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/aboutus',
        name: 'About us',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "about" */ '../components/register.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../components/login.vue')
    },

    {
        path: '/geographyquiz',
        name: 'geographyquiz',
        component: () => import(/* webpackChunkName: "about" */ '../components/geographyquiz.vue')
    }


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
