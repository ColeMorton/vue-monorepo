import app from '../app.js'
import template from '../templates/vue.html'

const controller = ($scope) => {
  $scope.model = {
    name: 'hybrid',
  }
}

app  
  .config(($routeProvider) => $routeProvider.when('/Vue', { template, controller }))
  .controller('VueController', controller)
