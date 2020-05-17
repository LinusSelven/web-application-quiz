import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import Login from './components/login'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.baseUrl = 'http://localhost:8080/';
Vue.component('app-login', Login);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')