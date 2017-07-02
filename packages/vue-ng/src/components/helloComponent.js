import Vue from 'vue'

export default Vue.component('hello-component', {
  props: {
    name: String
  },
  render (h) {
    var tag = 'h2';
    var props = {
      class: ['salmon'],
      style: {cursor: 'pointer'},
      on: { click: function(){ alert('Hello!') } }
    }
    var children = this.name;
    return h(tag, props, children);
  }
})