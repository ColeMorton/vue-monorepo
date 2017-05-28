<template lang='pug'>
div.box(
  :class='{dashed: dashed, dotted: dotted}'
  :style='{backgroundColor: color}'
)
  slot
</template>

<script>
  export default {
    props: ['color', 'dashed', 'dotted']
  }
</script>

<style lang='css' scoped>
  .box {
    width: 80px;
    height: 80px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .box.dashed {
    border-style: dashed;
  }
  .box.dotted {
    border-style: dotted;
  }
</style>
