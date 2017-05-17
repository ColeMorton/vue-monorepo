import { play } from 'vue-play'
import va from 'vue-atomic'

console.log(va)

play('MyButton')
  .add('with text', {
    template: `<button @click="$log('123')">Hello</button>`
  })
