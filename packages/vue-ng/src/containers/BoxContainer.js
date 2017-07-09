import va from 'vue-atomic'

const { Box } = va.components

export default {
  functional: true,
  props: {
    color: {
      type: String,
      default: 'green'
    }
  },
  render (h, { props, data }) {
    return h(Box, { props }, props.color );
  }
}
