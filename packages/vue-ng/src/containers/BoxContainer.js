export default {
  functional: true,
  props: {
    color: {
      type: String,
      default: 'green'
    }
  },
  render (h, { props, data }) {
    return h('div', { props }, props.color );
  }
}
