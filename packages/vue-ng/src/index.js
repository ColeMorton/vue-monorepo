import angular from 'angular'
import 'angular-route'
import vueComponents from './vueComponents'
import controllers from './controllers'
import { capitalizeFirstLetter } from './lib'

angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));

const MODULE_NAME = 'app'

const app = angular
  .module(MODULE_NAME, ['vue.components', 'ngRoute'])

Object.keys(controllers).forEach((key) => {
  const name = capitalizeFirstLetter(key)
  app.controller(name, controllers[key])
})

 app.controller('MainController', function($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
 })

 .controller('BookController', function($scope, $routeParams) {
     $scope.name = 'BookController';
     $scope.params = $routeParams;
 })

 .controller('ChapterController', function($scope, $routeParams) {
     $scope.name = 'ChapterController';
     $scope.params = $routeParams;
 })

.controller('VueController', function($scope, $routeParams) {
    $scope.name = 'VueController';
    $scope.params = $routeParams;
    $scope.person = {
      name: 'hybrid'
    }
 })

.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/Book/:bookId', {
    templateUrl: 'src/templates/book.html',
    controller: 'BookController',
    resolve: {
      // I will cause a 1 second delay
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 1000);
        return delay.promise;
      }
    }
  })
  .when('/Book/:bookId/ch/:chapterId', {
    templateUrl: 'src/templates/chapter.html',
    controller: 'ChapterController'
  })
  .when('/Vue', {
    templateUrl: 'src/templates/vue.html',
    controller: 'VueController'
  });

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});
