angular.module('tuCanchaApp').controller('setUpAccountController',setUpAccountController);

setUpAccountController.$inject = ['$scope'];
   
function setUpAccountController($scope){   
     $scope.signUp = function ( ) {
          console.log("Trying to register");
         if($scope.register.email != undefined && $scope.register.password != undefined && $scope.register.email != undefined && $scope.register.name != undefined){
         
            var user = new Parse.User();
            user.set("username", $scope.register_email);
            user.set("password", $scope.register_password);
            user.set("email", $scope.register_email);
            user.set("name", $scope.register_name);
            user.set("business", "NO");
            user.set("phone", $scope.register_phone);

            user.signUp(null, {
              success: function(user) {
                alert("El usuario "+$scope.register_email+" fue creado exitosamente, porfavor confirma tu correo.")

              },
              error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
              }
            });
         
         
         }else{
            alert("Por favor llena todos los campos del formulario")
         }
                         
         
    };
}
