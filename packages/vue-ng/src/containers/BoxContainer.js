import Vue from 'vue'
import va from 'vue-atomic'

const Box = va.components.Box

export default Vue.component('BoxContainer', {
  props: {
    color: {
      type: String,
      default: 'green'
    }
  },
  render (h) {
    const props = {
      color: this.color
    }
    return h(Box, { props }, this.color);
  }
})