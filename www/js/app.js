// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.services', 'starter.controllers','uiGmapgoogle-maps','ngCordova', 'ionic-material', 'ionMdInput', "ion-datetime-picker",'ionicLazyLoad'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider
    .state('app.reservation', {
        url: '/reservation',
        views: {
            'menuContent': {
                templateUrl: 'templates/reservation.html',
                controller: 'ReservationCtrl'
            }
        }
    })
    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            }
        }
    })
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('app.LocationMap', {
        url: '/Location',
        views: {
            'menuContent': {
                templateUrl: 'templates/Locationmap.html',
                controller: 'LocationMapCtrl'
            }
        }
    })
    .state('app', {
        url: '/app',
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        abstract: true
    }) 
    .state('app.detailsVoiture', {
    url: '/friends/:Id',
    views: {
      'menuContent': {
        templateUrl: 'templates/detailsVoiture.html',
        controller: 'FriendsCtrl'
      }
    }
  })
 .state('app.conexion', {
    url: '/Conexion',
    views: {
      'menuContent': {
        templateUrl: 'templates/conexion.html',
        controller: 'conexionCtrl'
      }
    }
  })
    .state('app.Home',{
        url:'/Home',
        views:{
            'menuContent':{
                templateUrl:'templates/Home.html',
                controller: 'HomeCtrl'

            }
        }
        
            })
    .state('app.detailsPreReservation',{
    url: '/DetailsPreReservation',
    views: {
      'menuContent': {
        templateUrl: 'templates/detailsPreReservation.html',
        controller: 'detailsPreReservationCtrl'
      }
    }
  })
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/Home');
});
