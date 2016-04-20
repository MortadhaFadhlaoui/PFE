angular.module('app.services', [])



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
             var payload = token.split('.')[1] // !!!!!!
                payload =$window.atob(payload);
                payload = JSON.parse(payload);
                console.log(payload);
                    return {
                        id : payload._id,
      email : payload.email,
      name : payload.name
    }

        }
    }
    var register = function(user){
        return $http.post('/auth/register', user).success(function(data){

                   if(data=="err_create")
                   {
                       console.log(data);
                   }
                   else {
                       console.log(data);
                       saveToken(data.token);
                   }
        })
    }

    var login = function(user)
    {
        return $http.post('/auth/login', user)
        .success(function(data){
            console.log(user);
            saveToken(data.token);
        })
        .error(function(){

            console.log("error in login")
        })
    }

return{
            saveToken: saveToken,
            getToken : getToken,
            logout :logout,
            isloggedin :isloggedin,
            currentUser :currentUser,
            regisr :register,
            login :login,
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
    savePreReservation: function(){
        
    }
}

}]);
