import angular from 'angular'
import 'angular-route'
import vueComponents from './vueComponents'
import controllers from './controllers'
import { capitalizeFirstLetter } from './lib'

const MODULE_NAME = 'app'

angular
  .module(MODULE_NAME, ['vue.components', 'ngRoute'])
  .config(($routeProvider, $locationProvider) => {
    $routeProvider
      // .when('/Book/:bookId', {
      //   templateUrl: 'book.html',
      //   controller: 'BookController',
      //   resolve: {
      //     delay: ($q, $timeout) => {
      //       const delay = $q.defer()
      //       $timeout(delay.resolve, 1000)
      //       return delay.promise;
      //     }
      //   }
      // })
      .when('/main', {
        templateUrl: 'file.html',
        controller: 'MainController'
      })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })
  })

Object.keys(controllers).forEach((key) => {
  const name = capitalizeFirstLetter(key)
  angular
    .module(MODULE_NAME)
    .controller(name, controllers[key])
})