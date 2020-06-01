import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import Login from './components/MySpace'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'


Vue.use(VueMaterial)
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('app-login', Login);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')