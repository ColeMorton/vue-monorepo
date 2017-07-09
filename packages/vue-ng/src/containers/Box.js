import Vue from 'vue'
import va from 'vue-atomic'

const MyButton = va.components.MyButton

export default Vue.component('Box', {
  props: {
    name: String
  },
  components: {
    'my-button': MyButton
  },
  render (h) {
    var tag = 'my-button';
    var props = {
      class: ['salmon'],
      style: {cursor: 'pointer'},
      on: { click: function(){ alert('Hello!') } }
    }
    var children = this.name;
    return h(tag, props, children);
  }
})