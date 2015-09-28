angular.module('tuCanchaApp').controller('setUpAccountController',setUpAccountController);

setUpAccountController.$inject = ['$scope'];
   
function setUpAccountController($scope){   
     $scope.signUp = function ( path ) {
        var user = new Parse.User();
        user.set("username", $scope.register_email);
        user.set("password", $scope.register_password);
        user.set("email", $scope.register_email);

        // other fields can be set just like with Parse.Object
        user.set("phone", $scope.register_phone);
       
        user.signUp(null, {
          success: function(user) {
            alert("El usuario "+$scope.register_email+" fue creado exitosamente.")
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
          }
        });
    };
}

