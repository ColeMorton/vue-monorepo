import angular from 'angular'
import vueComponents from './vueComponents'
import controllers from './controllers'
import { capitalizeFirstLetter } from './lib'

const MODULE_NAME = 'app'

angular
  .module(MODULE_NAME, ['vue.components'])

Object.keys(controllers).forEach((key) => {
  const name = capitalizeFirstLetter(key)
  angular
    .module(MODULE_NAME)
    .controller(name, controllers[key])
})