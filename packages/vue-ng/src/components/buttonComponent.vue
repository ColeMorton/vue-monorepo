<template>
  <my-button>
    {{ name }}
  </my-button>
</template>

<script>
import va from 'vue-atomic'
const { MyButton } = va.components
export default {
  props: {
    name: String
  },
  components: {
    MyButton
  }
}
</script>
