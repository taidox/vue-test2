import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: "home",
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        }
    ],
    linkExactActiveClass: "active"
})