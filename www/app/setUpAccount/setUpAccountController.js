angular.module('tuCanchaApp').controller('setUpAccountController',setUpAccountController);

setUpAccountController.$inject = ['$scope','$rootScope', '$location'];
   
function setUpAccountController($scope, $rootScope, $location){   
     $scope.isHiddenRegister = false;

     $scope.signUp = function ( ) {
          console.log("Trying to register");
          $scope.loading = true;
          $scope.isHiddenRegister = true;
         if($scope.register_email != undefined && $scope.register_password != undefined && $scope.register_email != undefined && $scope.register_name != undefined){
         
            var user = new Parse.User();
            user.set("username", $scope.register_email.toLowerCase());
            user.set("password", $scope.register_password);
            user.set("email", $scope.register_email.toLowerCase());
            user.set("name", $scope.register_name.toLowerCase());
            user.set("business", "NO");
            user.set("phone", $scope.register_phone);

            user.signUp(null, {
              success: function(user) {
                alert("El usuario "+$scope.register_email+" fue creado exitosamente, Bienvenido a Tu Cancha!.")
                $rootScope.$apply(function() {
                  $location.path("/reservationLanding");
                });
                $scope.loading = false;
                $scope.isHiddenRegister = false;

              },
              error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);

                $scope.loading = false;
                $scope.isHiddenRegister = false;

                $rootScope.$apply(function() {
                  $location.path("/setUpAccount");
                });
              }
            });
         
         
         }else{
            alert("Por favor llena todos los campos del formulario")
         }
                         
         
    };
}

