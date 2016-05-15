/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl',['$rootScope' ,'loginservice','$scope','$state', '$ionicModal', '$ionicPopover', '$timeout','$ionicLoading' , function($rootScope,loginservice,$scope,$state, $ionicModal, $ionicPopover, $timeout,$ionicLoading) {
    // Form data for the login modal
    
 $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
          $timeout(function() {
            $ionicLoading.hide();
        }, 1000);
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

  
    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };
    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

   /* $scope.isLoggedIn = function() {

       if (loginservice.isloggedin){
             $rootScope.loggedIn = false;
            }
          else{
             $rootScope.loggedIn = true;
            }
    };*/
    $scope.logout = function(){
       $rootScope.loggedIn = true;
          loginservice.logout();
          $state.go("app.login");
          console.log('aaaaaaaaa',loginservice.currentUser());
    }
}])

.controller('LoginCtrl',['$rootScope' ,'loginservice','newReservation','$state','$scope', '$timeout','$ionicPopup' , '$stateParams','ionicMaterialMotion', 'ionicMaterialInk','$ionicLoading', function($rootScope,loginservice,newReservation,$state,$scope, $timeout,$ionicPopup, $stateParams,ionicMaterialMotion, ionicMaterialInk,$ionicLoading) {
   if (loginservice.isloggedin()==false) {
console.log("the user is not logedin",loginservice.isloggedin());
    $scope.$parent.showHeader();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);


      $timeout(function () {
       ionicMaterialMotion.fadeSlideInRight();
   }, 300);

    ionicMaterialInk.displayEffect();
$ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
          $timeout(function() {
            $ionicLoading.hide();
        }, 1000);
$scope.form = {};
$scope.client ={};
        $scope.error = false;
 $scope.show_menu = false;
    $scope.login = function(client){
      
  console.log(client);
        loginservice.login(client)
          .error(function(err){
                  var alertPopup = $ionicPopup.alert({
            title: 'L’e-mail entré ne correspond à aucun compte. Veuillez créer un compte.',
            template: ''
        });

        $timeout(function() {
            ionicMaterialInk.displayEffect();
        }, 0);
                 
            console.log("login err",err);
            $scope.error = true;
          })
          .then(function(data){
              console.log("user login in");
              $scope.client = loginservice.currentUser();
              console.log("the currentUser is",loginservice.currentUser())
              $scope.form = newReservation.getForm();
                
              console.log("how it is", newReservation.getForm());
                    if(angular.equals({}, $scope.form))
                    {
                        console.log("login to profile");

                       $state.go("app.reservation");
      
                    }

                    else {

              $scope.form.Client_idClient = $scope.client.id;

              newReservation.saveform($scope.form);
               console.log("how it is again",newReservation.getForm());
               $state.go("app.detailsPreReservation");

             }
$rootScope.loggedIn = false;
            

          })
        
      $scope.show_menu = true;
              console.log($scope.show_menu);
       //your other code

    };

}
else{
  $state.go("app.profile");
}




    

        

}])

.controller('FriendsCtrl',['loginservice','newReservation','$state','$scope','$http','$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion','$ionicLoading', function(loginservice,newReservation,$state,$scope,$http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,$ionicLoading) {
    $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
          $timeout(function() {
            $ionicLoading.hide();
        }, 1000);
    // Set Header
    $scope.$parent.showHeader();

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
   

    // Set Ink
    ionicMaterialInk.displayEffect();

$scope.form = {};
    $http.get('http://192.168.1.4:3000/auth/admin/admin/voitures').
    success(function(data){
         $timeout(function () {
       ionicMaterialMotion.fadeSlideInRight();
   }, 100);

console.log('ok');
        $scope.voitures=data;

        $scope.witchvoitures=$state.params.Id;

    });
    $scope.getID = function(item){



$scope.form= newReservation.getForm();
console.log(item.idVoiture);
$scope.form.Voiture_idVoiture = item.idVoiture;
$scope.form.Voiture_Modele_idModele = item.Modele_idModele;

newReservation.saveform($scope.form);
console.log("omorha henya",newReservation.getForm());

}
$scope.termine = function(data){

  $scope.currentUser = loginservice.currentUser();

  $scope.form= newReservation.getForm();


  if(data.GPS==true){
$scope.form.prixGPS = data.GPS;
}
if(data.chauffer){
$scope.form.prixChaisse = data.chauffer;
}

if(data.chaisebebe){
$scope.form.prixChauffeur = data.chaisebebe;
}

      console.log("en chemin",$scope.form = newReservation.getForm());



newReservation.saveform($scope.form);
if($scope.currentUser){
  $scope.form.Client_idClient = $scope.currentUser.id;
  $state.go("app.detailsPreReservation");
}else{
$state.go("app.login");
}
      console.log("lellllllllll",newReservation.getForm());
}

}])
.controller('conexionCtrl', ['loginservice','newReservation','$state','$scope','$http','$ionicPopup' ,'$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion','$ionicLoading', function(loginservice,newReservation,$state,$scope,$http,$ionicPopup, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,$ionicLoading) {
        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
          $timeout(function() {
            $ionicLoading.hide();
        }, 1000);
        $scope.min=5;
        $scope.max=5;
      $scope.$parent.showHeader();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    

    // Set Motion
     $timeout(function () {
       ionicMaterialMotion.fadeSlideInRight();
   }, 300);

    // Set Ink
    ionicMaterialInk.displayEffect();


$scope.credentials = {};
$scope.conexion = function (){
  console.log("ok");
loginservice.register($scope.credentials)
.error(function(err){
   console.log("the error is",err);
    

}).then(function(data){
  console.log(data.data);
  var obj = {"err_create":"CREATE_ALREADY_HAVE_ACCOUNT"};
  console.log("hello",JSON.stringify(data.data)===JSON.stringify(obj));
if(JSON.stringify(data.data)===JSON.stringify(obj)){
  console.log("email exist");
   var alertPopup = $ionicPopup.alert({
            title: 'L’e-mail entré existe déjà.',
            template: ''
        });
}
else{

  //credentials = loginservice.currentUser();
  $scope.form = {};
  $scope.form = newReservation.getForm();
  console.log("the reservation",$scope.form);
  if(angular.equals({},$scope.form)){
    console.log("go hell profile")
    $state.go('app.profile');

  }
  else{
    console.log('haw wa7ed jdid :3',$scope.credentials)
    $scope.form.Client_idClient = credentials.id;
    newReservation.saveform(JSON.stringify($scope.form));
    $state.go("app.detailsPreReservation");
  }
}







})

}

}])


.controller('ProfileCtrl',['loginservice','$scope', '$stateParams', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk','$ionicLoading', function(loginservice,$scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$ionicLoading) {
   
    // Set Header
    $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
          $timeout(function() {
            $ionicLoading.hide();
        }, 1000);
    $scope.$parent.showHeader();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
    console.log("the user is logedin profile",loginservice.isloggedin());
}])

.controller('ReservationCtrl',['loginservice','newReservation','$state','$scope','$http','$stateParams', '$timeout','$ionicPopup' , 'ionicMaterialInk', 'ionicMaterialMotion','$ionicLoading' ,function(loginservice,newReservation,$state,$scope,$http, $stateParams, $timeout,$ionicPopup, ionicMaterialInk, ionicMaterialMotion,$ionicLoading) {



  $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
          $timeout(function() {
            $ionicLoading.hide();
        }, 1000);

  $scope.$parent.showHeader();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.data = {};
    $scope.data.date_debut = new Date();
    $scope.data.heure_debut = new Date();
    $scope.data.date_fin = new Date();
    $scope.data.heure_fin = new Date();
    $scope.form = {};
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 300);

    // Activate ink for controller




$scope.value = false;
  console.log('ContactCtrl started') ;
    ionicMaterialInk.displayEffect();
    $scope.valide = function(data){   
    if(($scope.data.date_fin.getDate()>($scope.data.date_debut.getDate()))){
      if ($scope.data.lieu_prise) {
        console.log("date depart inf a date systeme",$scope.data.date_debut.getDate());
        if(($scope.data.date_debut.getDate()>=(new Date().getDate()))){
          if ($scope.data.lieu_retour) {
          console.log("date retour inf a date depart",$scope.data.date_debut.getDate()>(new Date().getDate()));
          if($scope.data.value) {      
                     $scope.form.Voiture_idVoiture = 0;
                     $scope.form.Voiture_Modele_idModele = 0;
                     $scope.form.Client_idClient = 0;
                     console.log("data jawha bahi",data);
                     newReservation.saveform(data);
                     console.log("Retrieving form from service", newReservation.getForm());
                     $state.go('app.friends');            
              }
   else{                  
                  var alertPopup = $ionicPopup.alert({
            title: 'Pour continuer vous devez accepter le condition avoir plus de 25',
            template: ''
        });
   
   };
   }
   else{
          var alertPopup = $ionicPopup.alert({
            title: 'il faut choisir le lieu de Retour',
            template: ''
   });
        }}
     
      else{
  var alertPopup = $ionicPopup.alert({
            title: 'date depart inférieur a date actuel',
            template: ''
        });
      }
}else{var alertPopup = $ionicPopup.alert({
            title: 'il faut choisir le lieu depart',
            template: ''
        });

};

    }else{var alertPopup = $ionicPopup.alert({
            title: 'Vous pouver réserve au moins jour',
            template: ''
        });

    }
  }
                 
   

}])

.controller('LocationMapCtrl', ["$scope","$q","$ionicLoading","$compile","$window",'$stateParams','$timeout','ionicMaterialInk','ionicMaterialMotion','uiGmapGoogleMapApi',function($scope,$q,$ionicLoading,$compile,$window, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,uiGmapGoogleMapApi) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);
    // Activate ink for controller
    ionicMaterialInk.displayEffect();
console.log("hell");
$ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
          $timeout(function() {
            $ionicLoading.hide();
        }, 1000);
    $scope.onclick = function(){
 var onSuccess = function(position) {
    $scope.map.center = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    $scope.$apply();
}
function onError(error) {
    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}
navigator.geolocation.getCurrentPosition(onSuccess, onError);

}
$scope.map = { center: { latitude: 36.862498, longitude: 10.195565 }, zoom: 16 };
 $scope.marker = {
      id: 0,
      coords: {
        latitude: 36.862498,
        longitude: 10.195565
      },
      window : {
        "title": "King Rent a Car, TN"
      }

    };





    $scope.locationClicked = function(marker){
          window.location = "geo:" +marker.latitude + "," + marker.longitude + ";u=35";
          console.log("the direction is ok");
    };
     uiGmapGoogleMapApi.then(function(maps) {

    });


}])
.controller('detailsPreReservationCtrl',['newReservation','$state','$scope','$http','$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion','$ionicLoading', function(newReservation,$state,$scope,$http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,$ionicLoading){

  // Set Header
    $scope.$parent.showHeader();
    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
 $scope.form = newReservation.getForm();
 console.log("role");


}])
.controller('HomeCtrl',['$scope','$timeout','$ionicLoading','$stateParams','ionicMaterialInk','$ionicSideMenuDelegate','$state',function($scope,$timeout,$ionicLoading,$stateParams,ionicMaterialInk,$ionicSideMenuDelegate,$state){
 $ionicSideMenuDelegate.canDragContent(false);
 $scope.reservation = function() {
        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            $ionicLoading.hide();
        }, 1000);
        $state.go("app.reservation");
    };
    $scope.login = function() {
        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            $ionicLoading.hide();
        }, 1000);
        $state.go("app.login");
    };
     $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();



}]);

