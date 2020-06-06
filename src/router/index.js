import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/category.vue'
import MySpace from '../components/MySpace.vue'
import Register from '../components/register.vue'
import CreateNewQuiz from '../components/CreateNewQuiz.vue'
import AllUsers from '../components/AllUsers'
import AllQuiz from '../components/AllQuiz'
import myScores from '../components/myScores'
import AllScores from '../components/AllScores'
import myRates from '../components/myRates'
import AllRates from '../components/AllRates'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/aboutUs',
        name: 'About us',
        component: () => import(/* webpackChunkName: "about" */ '../components/About.vue')
    },
    {
        path: '/AllRates',
        name: 'AllRates',
        component: AllRates
    },
    {
        path: '/AllUsers',
        name: 'AllUsers',
        component: AllUsers
    },
    {
        path: '/AllScores',
        name: 'AllScores',
        component: AllScores
    },
    {
        path: '/myScores',
        name: 'myScores',
        component: myScores
    },
    {
        path: '/AllQuiz',
        name: 'AllQuiz',
        component: AllQuiz
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
        path: '/myRates',
        name: 'myRates',
        component: myRates
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
