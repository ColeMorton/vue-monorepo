<template lang="pug">
div
  p Hello Worlds!
  button.button(
    v-bind:style='{ color: color, borderColor: color }'
    v-bind:class='{rounded: rounded}'
    @click='handleClick'
  )
    slot
  //- <button class="button" :style="{color: color, borderColor: color}" @click="handleClick" :class="{rounded: rounded}"><slot></slot></button>
</template>

<script>
  export default {
    props: {
      rounded: Boolean,
      handleClick: () => console.log('clicked!'),
      color: {
        default: '#42b983'
      }
    }
  }
</script>

<style scoped>
  .button {
    border: 3px solid;
    padding: 10px 20px;
    border-radius: 3px;
    background-color: white;
    outline: none;
  }
</style>
