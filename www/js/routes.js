angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

     .state('menu.rServation', {
    url: '/Réservation',
    views: {
      'side-menu21': {
        templateUrl: 'templates/rServation.html',
        controller: 'rServationCtrl'
      }
    }
  })

  .state('menu.voiture', {
    url: '/Voiture',
    views: {
      'side-menu21': {
        templateUrl: 'templates/voiture.html',
        controller: 'voitureCtrl'
      }
    }
  })

  .state('menu.paramTres', {
    url: '/Paramètres',
    views: {
      'side-menu21': {
        templateUrl: 'templates/paramTres.html',
        controller: 'paramTresCtrl'
      }
    }
  })

  .state('menu.login', {
    url: '/Login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.detailsVoiture', {
    url: '/Voiture/:Id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detailsVoiture.html',
        controller: 'voitureCtrl'
      }
    }
  })

  .state('menu.conexion', {
    url: '/Conexion',
    views: {
      'side-menu21': {
        templateUrl: 'templates/conexion.html',
        controller: 'conexionCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/Réservation')

});