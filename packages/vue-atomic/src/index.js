import play from './components/box/Box.play.js'
import components from './components'

console.log('vue-atomic started')

function test() {
  console.log('test')
  return true
}

export default {
  test: test,
  play: play,
  ...components
}