import Vue from 'vue'
import {play} from 'vue-play'
import MyButton from './index.vue'

Vue.component('my-button-pug', MyButton)

play('Button-Pug')
  .add('with emoji', `<my-button-pug>🤔</my-button-pug>`)
  .add('colorful', {
    render(h) {
      return h(MyButton, {
        props: {color: 'pink'}
      }, ['hello worldss!'])
    }
  })
  .add('rounded', `<my-button-pug :rounded="true">rounded</my-button-pug>`)
