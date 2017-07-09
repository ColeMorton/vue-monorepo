import 'ngVue'
import angular from 'angular'
import components from './components'
import containers from './containers'
import './instances'

const MODULE_NAME = 'vue.components'

angular
  .module(MODULE_NAME, ['ngVue'])

Object
  .keys(components)
  .forEach((key) => angular
    .module(MODULE_NAME)
    .value(key, components[key])
)

Object
  .keys(containers)
  .forEach((key) => angular
    .module(MODULE_NAME)
    .value(key, containers[key].default)
)

export default 'vue.components'