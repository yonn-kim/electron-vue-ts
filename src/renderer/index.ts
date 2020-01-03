import Vue from 'vue'
import axios from 'axios'
import App from './components/App.vue'

Vue.prototype.$http = axios

new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
