import Vue from 'vue'
import App from './App.vue'

//Lodash
import _ from 'lodash';
Object.defineProperty(Vue.prototype, '$_', { value: _ });

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)// Install BootstrapVue
Vue.use(IconsPlugin)// Optionally install the BootstrapVue icon components plugin

Vue.config.productionTip = false

import store from './store'
new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
