

angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

// Turn off caching for demo simplicity's sake
 $ionicConfigProvider.views.maxCache(0);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

     .state('menu.rServation', {
    url: '/Réservation',
    views: {
      'fabContent': {
        templateUrl: 'templates/rServation.html',
        controller: 'rServationCtrl'
      }
    }
  })

  .state('menu.voiture', {
    url: '/Voiture',
    views: {
      'fabContent': {
        templateUrl: 'templates/voiture.html',
        controller: 'voitureCtrl'
      }
    }
  })

  .state('menu.paramTres', {
    url: '/Paramètres',
    views: {
      'fabContent': {
        templateUrl: 'templates/paramTres.html',
        controller: 'paramTresCtrl'
      }
    }
  })
  .state('menu.LocationMap', {
    url: '/Location',
    views: {
      'fabContent': {
        templateUrl: 'templates/Locationmap.html',
        controller: 'LocationMapCtrl'
      }
    }
  })
  .state('menu.login', {
    url: '/Login',
    views: {
      'fabContent': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu', {
    url: '/fabContent',
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    abstract:true
  })

  .state('menu.detailsVoiture', {
    url: '/Voiture/:Id',
    views: {
      'fabContent': {
        templateUrl: 'templates/detailsVoiture.html',
        controller: 'voitureCtrl'
      }
    }
  })

  .state('menu.conexion', {
    url: '/Conexion',
    views: {
      'fabContent': {
        templateUrl: 'templates/conexion.html',
        controller: 'conexionCtrl'
      }
    }
  })
  .state('menu.detailsPreReservation',{
    url: '/DetailsPreReservation',
    views: {
      'fabContent': {
        templateUrl: 'templates/detailsPreReservation.html',
        controller: 'detailsPreReservationCtrl'
      }
    }
  })
  .state('menu.profile',{
    url: '/profile',
    views: {
      'fabContent': {
        templateUrl: 'templates/profil.html',
        controller: 'profilCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/fabContent/Réservation')

});