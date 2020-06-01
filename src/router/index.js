import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/category.vue'
import MySpace from '../components/MySpace.vue'
import Register from '../components/register.vue'
import CreateNewQuiz from '../components/CreateNewQuiz.vue'
import DispoUsers from '../components/DispoUsers'
import DispoQuiz from '../components/DispoQuiz'


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
        path: '/DispoUsers',
        name: 'DispoUsers',
        component: DispoUsers
    },
    {
        path: '/DispoQuiz',
        name: 'DispoQuiz',
        component: DispoQuiz
    },
    {
        path: '/results',
        name: 'Results',
        component: () => import(/* webpackChunkName: "about" */ '../components/Results.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/MySpace',
        name: 'MySpace',
        component: MySpace
    }  ,
    {
        path: '/CreateNewQuiz',
        name: 'CreateNewQuiz',
        component: CreateNewQuiz
    }  ,

    {
        path: '/rate',
        name: 'rate',
        component: () => import(/* webpackChunkName: "about" */ '../components/rate.vue')
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
        component: () => import(/* webpackChunkName: "about" */ '../components/mattequiz.vue')
    },

    {
        path: '/svenskaQuiz',
        name: 'svenskaQuiz',
        component: () => import(/* webpackChunkName: "about" */ '../components/svenskaQuiz.vue')
    },

    {
        path: '/engelskaQuiz',
        name: 'engelskaQuiz',
        component: () => import(/* webpackChunkName: "about" */ '../components/engelskaQuiz.vue')
    }


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
