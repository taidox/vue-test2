import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Tour from './components/Tour.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: "home",
            component: Home
        },
        {
            path: '/Tour',
            name: 'tour',
            component: Tour
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },

    ],
    linkExactActiveClass: "active"
})