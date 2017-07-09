<script>
import va from 'vue-atomic'
const { MyButton } = va.components
export default {
  functional: true,
  props: {
    name: String
  },
  render: (h, { props }) => h(MyButton, {}, props.name)
}
</script>
