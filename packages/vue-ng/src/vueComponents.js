import 'ngVue'
import angular from 'angular'
import helloComponent from './components/helloComponent.js'
import components from './components'
import { capitalizeFirstLetter } from './lib'

const MODULE_NAME = 'vue.components'

angular
  .module(MODULE_NAME, ['ngVue'])

Object.keys(components).forEach((key) => {
  const name = capitalizeFirstLetter(key)
  angular
    .module(MODULE_NAME)
    .value(name, components[key])
})

export default 'vue.components'