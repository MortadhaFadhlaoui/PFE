angular.module('app.controllers', [])
  
.controller('AppCtrl', function($scope) {

})





.controller('rServationCtrl',['$state' ,'$scope','newReservation' , function($state,$scope,newReservation) {
$scope.form = {};
$scope.valide = function(data){

            $scope.form.Voiture_idVoiture = 0;
            $scope.form.Voiture_Modele_idModele = 0;
            $scope.form.Client_idClient = 0;
            $scope.form.prixGPS = false;
             $scope.form.prixChaisse = false;
              $scope.form.prixChauffeur = false;

  if(data!=null){
if(data.lieu_prise && data.date_debut && data.heure_debut && data.lieu_retour && data.date_fin && data.heure_retour){

  console.log("data jawha bahi",data);
 newReservation.saveform(data);
 console.log("Retrieving form from service", newReservation.getForm());
 $state.go('menu.voiture');
}else{
  console.log("not jawna bahi",data);
}
}
else{
  console.log("data null");
}

}


}])

















.controller('voitureCtrl',['newReservation','$state','$scope','$http', function(newReservation,$state,$scope, $http) {
  $scope.form = {};
   	$http.get('http://localhost:3000/auth/admin/admin/voitures').success(function(data){

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



  $scope.form= newReservation.getForm();
  if(data.GPS != null){
$scope.form.prixGPS = data.GPS;
}
if(data.chauffer!= null){
$scope.form.prixChaisse = data.chauffer;
}
if(data.chaisebebe!= null){
$scope.form.prixChauffeur = data.chaisebebe;
}
      console.log("en chemin",$scope.form = newReservation.getForm());
      console.log("lellllll",data);
      
   
newReservation.saveform($scope.form);
$state.go("menu.login");
      console.log("lellllllllll",newReservation.getForm());
}
 
}])





   
.controller('paramTresCtrl', function($scope) {

})











   
.controller('loginCtrl',['$scope', 'loginservice', '$ionicPopup', '$state','newReservation', function($scope, loginservice, $ionicPopup, $state,newReservation	) {

$scope.form = {};


$scope.login = function(client){
        loginservice.login(client)
          .error(function(err){
            alert(err);
          })
          .then(function(data){
              console.log("user login in");
              client = loginservice.currentUser();
              $scope.form = newReservation.getForm();
              console.log("how it is", newReservation.getForm())


          })
        }











	//$scope.data = {};
	 //  $scope.login = function() {
     //   loginservice.loginUser($scope.data.Adresse, $scope.data.Password).success(function(data) {
        
       //     $state.go('menu.rServation');
       // }).error(function(data) {
           // var alertPopup = $ionicPopup.alert({
             //   title: 'Login failed!',
               // template: 'Please check your credentials!'
            //});
        //});
    //}


}])
      
.controller('detailsVoitureCtrl',['$state' ,'$scope','newReservation', function($state,$newReservation,$scope) {



}])
   
.controller('conexionCtrl', function($scope) {

})
   
.controller('profilCtrl', function($scope) {

})
 