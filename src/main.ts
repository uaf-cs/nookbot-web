import Vue from 'vue'
import Toasted from 'vue-toasted'

import App from './App.vue'

Vue.use(Toasted, {
  className: 'toast'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
