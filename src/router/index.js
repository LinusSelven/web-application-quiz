import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/category.vue'
import Login from '../components/login.vue'

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
        component: () => import(/* webpackChunkName: "about" */ '../components/About.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "about" */ '../components/register.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    {
        path: '/geographyquiz',
        name: 'geographyquiz',
        component: () => import(/* webpackChunkName: "about" */ '../components/geographyquiz.vue')
    }
    ,

    {
        path: '/matteQuiz',
        name: 'mattequiz',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/mattequiz.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
