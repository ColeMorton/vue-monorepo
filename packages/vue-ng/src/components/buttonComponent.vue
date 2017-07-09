<template>
  <my-button>
    {{ name }}
  </my-button>
</template>

<script>
import va from 'vue-atomic'
export default {
  props: {
    name: String
  },
  components: {
    'my-button': va.components.MyButton
  }
}
</script>
