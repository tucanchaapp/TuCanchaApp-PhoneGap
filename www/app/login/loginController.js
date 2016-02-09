angular.module('tuCanchaApp').controller('loginController',loginController);

loginController.$inject = ['$scope','$location','$rootScope'];
   

function loginController($scope,$location,$rootScope){
    
     $scope.logIn = function () {

         if ($scope.login_username != undefined  ){
             if($scope.login_password != undefined){
                 
                 Parse.User.logIn($scope.login_username, $scope.login_password, {

                  success: function(user) {
                      $rootScope.$apply(function() {
                        $location.path('/reservationLanding');            
                      });
                  },
                  error: function(error) {
                      if(error.code == 101){
                        alert("usuario o contraseña invalido")
                      }else{
                        alert("Code: " +error.code +" Message: " + error.message);              
                      }
                      
                  }

                })
             }else{
                alert("Por favor ingrese su contraseña ")    
             }
         }else{
            alert("Por favor ingrese su correo")
         }
         
     }
     
    if (Parse.User.current()) {       
            $location.path('/reservationLanding');                 
    }
          
}