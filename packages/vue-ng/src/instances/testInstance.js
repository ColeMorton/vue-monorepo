import Vue from 'vue'
import Counter from './Counter.vue'
import store from '../store'

const ABC = {
  template: '<div>Because I am awesome!!</div>'
}

new Vue({
  el: '#instance',
  store,
  components: {
    ABC
  },
  template: '<ABC></ABC>'
})
