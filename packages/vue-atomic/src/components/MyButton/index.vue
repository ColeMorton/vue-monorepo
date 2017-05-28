<template lang="pug">
button.button(
  :style='{ color: color, borderColor: color, fontSize: fontSize }'
  :class='{ rounded: rounded }'
  @click='handleClick'
)
  slot
</template>

<script>
  export default {
    props: {
      rounded: Boolean,
      color: {
        default: '#42b983'
      },
      palette: {
        default: 'primary'
      },
      type: {
        default: 'button'
      },
      height: {
        default: 40
      }
    },
    computed: {
      fontSize: function () {
        return `${this.height / 40}rem`
      }
    },
    methods: {
      handleClick: () => console.log('clicked!'),
    }
  }
</script>

<style scoped>
  .button {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    border: 0.0625em solid;
    height: 2.5em;
    justify-content: center;
    text-decoration: none;
    padding: 0 1em;
    border-radius: 0.125em;
    box-sizing: border-box;
    transition: background-color 250ms ease-out, color 250ms ease-out, border-color 250ms ease-out;
  }
</style>
