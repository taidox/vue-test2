import Vue from 'vue'
import App from './App.vue'
import Router from './route.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAS0bKdblb5bbGurGkI0iOlRJOTzwhCvyQ',
        libraries: 'places',
    }
})

Vue.config.productionTip = false

new Vue({
    router: Router,
    render: h => h(App)
}).$mount('#app')
