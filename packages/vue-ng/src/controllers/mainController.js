import app from '../app.js'

const controller = () => {}

app
  .config(($routeProvider) => $routeProvider.when('/', { controller }))
  .controller('MainController', controller)
