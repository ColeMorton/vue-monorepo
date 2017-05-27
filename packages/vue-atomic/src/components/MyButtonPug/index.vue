<template lang="pug">
div
  h1 Hello world!
</template>

<script>
  export default {
    props: {
      rounded: Boolean,
      handleClick: {
        default: () => () => null
      },
      color: {
        default: '#42b983'
      }
    }
  }
</script>

<style>
  .button {
    border: 3px solid;
    padding: 10px 20px;
    border-radius: 3px;
    background-color: white;
    outline: none;
  }
</style>
