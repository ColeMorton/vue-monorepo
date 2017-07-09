import Vue from 'vue'

const vm = new Vue({
  el: '#instance',
  template: '<div id="example"><p>Original message: "{{ message }}"</p><p>Computed reversed message: "{{ reversedMessage }}"</p></div>',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})

export default vm