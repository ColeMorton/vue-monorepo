<template>
  <div id="app">
    Clicked: {{ count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
export default {
  props: {
    count: Number,
    evenOrOdd: String
  },
  methods: {
    increment() {
      this.$emit('increment')
    },
    decrement() {
      this.$emit('decrement')
    },
    incrementIfOdd() {
      this.$emit('incrementIfOdd')
    },
    incrementAsync() {
      this.$emit('incrementAsync')
    }
  }
}
</script>
