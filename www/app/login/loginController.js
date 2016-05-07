angular.module('tuCanchaApp').controller('loginController',loginController);

loginController.$inject = ['$scope','$location','$rootScope'];


function loginController($scope,$location,$rootScope){

  $rootScope.currentUser = Parse.User.current();

  $rootScope.loggedIn = function() {
    if ($rootScope.currentUser === null) {
      return false;
    } else {
      return true;
    }
  };


  // redirect to "/reservationLanding" if user is already logged in
  if ($rootScope.loggedIn() === true) {
    $location.path("/reservationLanding");
  }

  function loginSuccessful(user) {
    $rootScope.$apply(function() {
      $rootScope.currentUser = Parse.User.current();
      $location.path("/reservationLanding");
    });
  }

  function loginUnsuccessful(user, error) {
    alert("Correo o contraseña inválido");
    
  }



  $scope.logIn = function() {   
    console.log("Trying To LogIn");
    if ($scope.login_username != undefined  ){
      if($scope.login_password != undefined){
        var username = $scope.login_username;
        var password = $scope.login_password;

        Parse.User.logIn(username, password, {
          success: loginSuccessful,
          error: loginUnsuccessful
        });
      }
      else{
        alert("Por favor ingrese su contraseña ");
      }
    }
    else{
      alert("Por favor ingrese su correo");
    }
  };          
}