angular.module('starter.services', [])



.service('BlankService', [function(){

}])

.service('loginservice',['$http','$window' ,function($http,$window){
    


    var saveToken = function(token){
        $window.localStorage['client-token']=token;
    }
    var getToken = function (){
        return $window.localStorage['client-token'];
    }
    var logout = function() {
      $window.localStorage.removeItem('client-token');
    };

var isloggedin = function(){
    var token = getToken();
    var payload;
    
    if(token=="undefined"){
      console.log("undefined token",token);
      return false;
    }

    if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload); //will decode a Base64 string
            payload = JSON.parse(payload);
                    console.log(payload.exp > Date.now() / 1000);
       return payload.exp > Date.now() / 1000;
       
      } else {
        return false;
    }

}


    var currentUser = function(){

        if(isloggedin())
        {
            var token = getToken();
             var payload = token.split('.')[1] 
                payload =$window.atob(payload);
                payload = JSON.parse(payload);
                console.log("the payload is",payload);
                    return {
      id : payload._id,
      email : payload.email,
      nom : payload.nom
    }

    }
    }



    var register = function(user){
        return $http.post('http://192.168.1.4:3000/auth/register', user)
        .success(function(data){

                   if(data=="err_create")
                   {
                       console.log("error", data);
                   }
                   else {
                       console.log("succes",data);
                       saveToken(data.token);
                   }
        })
    }
    var getProfile = function(){
      return $http.get('http://192.168.1.4:3000/auth.profile',{
        headers: {
               Authorization: 'Bearer '+ getToken()
        }
      })
    }

    var login = function(user)
    {
        return $http.post('http://192.168.1.4:3000/auth/login', user)
        .success(function(data){
            console.log("the data is",data);
            saveToken(data.token);
        })
        .error(function(){

            console.log("error fillogin login")
        })
    }

return{
            saveToken: saveToken,
            getToken : getToken,
            logout :logout,
            isloggedin :isloggedin,
            currentUser :currentUser,
            register :register,
            login :login,
            getProfile :getProfile

}


}])
.service('newReservation',[function(){
     
return{
    form:{},
    getForm: function(){
        return this.form;
    },
    saveform: function(form){
        this.form=form;
    },
     removeReservation : function()
            {
                this.newReservation ={};


            },

          getCars : function()
           {

           return $http.get('/client/voitures');


             },

    savePreReservation: function(){
         return $http.post('/auth/admin/admin/PreReservations',data);
    }
}

}]);
