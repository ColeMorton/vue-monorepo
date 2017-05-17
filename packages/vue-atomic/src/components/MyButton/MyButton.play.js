import Vue from 'vue'
import {play} from 'vue-play'
import MyButton from './MyButton.vue'

Vue.component('my-button', MyButton)

play('Button')
  .add('with emoji', `<my-button>🤔</my-button>`)
  .add('colorful', {
    render(h) {
      return h(MyButton, {
        props: {color: 'pink'}
      }, ['hello world'])
    }
  })
  .add('rounded', `<my-button :rounded="true">rounded</my-button>`)
