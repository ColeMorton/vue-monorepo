import Box from './components/box/Box.vue';
console.log('vue-atomic started');

function test() {
  console.log('test');
  return true;
}

export default {
  test: test,
  Box: Box
}