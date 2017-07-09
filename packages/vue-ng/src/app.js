import angular from 'angular'
import 'angular-route'
import './vueComponents'
import { capitalizeFirstLetter } from './lib'

angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));

const MODULE_NAME = 'app'

const app = angular
  .module(MODULE_NAME, ['vue.components', 'ngRoute'])
  .config(($routeProvider, $locationProvider) => {
      $locationProvider.html5Mode(true)
  })

export default app
