import Vue from 'vue'
import Counter from './Counter.vue'
import store from '../store'

new Vue({
  el: '#instance',
  store,
  render: h => h(Counter)
})
