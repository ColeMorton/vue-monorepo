<template>
  <Presentation
    :count="count"
    :evenOrOdd="evenOrOdd"
    @increment="increment"
    @decrement="decrement"
    @incrementIfOdd="incrementIfOdd"
    @incrementAsync="incrementAsync">
  </Presentation>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Presentation from './Presentation.vue'

export default {
  components: {
    Presentation
  },
  computed: mapGetters([
    'count',
    'evenOrOdd'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
</script>
