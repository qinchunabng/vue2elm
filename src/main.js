import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { get, post} from './utils/ajax'
import './config/rem'

Vue.config.productionTip = false

Vue.prototype.$http = {get,post};

export default new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
});
