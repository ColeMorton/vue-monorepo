import vue from 'vue';
console.log('vue-atomic started');

function test() {
  console.log('test');
  console.log('vue loaded: ', vue)
  return true;
}

export default {
  test: test
}