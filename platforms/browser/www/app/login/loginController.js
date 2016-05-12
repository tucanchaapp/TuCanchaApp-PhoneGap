angular.module('tuCanchaApp').controller('loginController',loginController);

loginController.$inject = ['$scope','$location','$rootScope', '$http'];


function loginController($scope,$location,$rootScope,$http){

  
  $rootScope.currentUser = Parse.User.current();
  $scope.isHiddenLogIn = false;
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
    $scope.loading = false;
    $rootScope.$apply(function() {
      $rootScope.currentUser = Parse.User.current();
      $location.path("/reservationLanding");
    });
  }

  function loginUnsuccessful(user, error) {

    alert("Correo o contraseña inválido");
    $scope.loading = false;
    $scope.isHiddenLogIn = false;
    
    $rootScope.$apply(function() {
      $location.path("/login");
    });
    
  }



  $scope.logIn = function() {   
    console.log("Trying To LogIn");
    $scope.isHiddenLogIn = true;
    $scope.loading = true;
    if ($scope.login_username != undefined  ){
      if($scope.login_password != undefined){
        var username = $scope.login_username.toLowerCase();
        var password = $scope.login_password;

        Parse.User.logIn(username, password, {
          success: loginSuccessful,
          error: loginUnsuccessful
        });
      }
      else{
        $scope.loading = false;
        $scope.isHiddenLogIn = false;
        alert("Por favor ingrese su contraseña ");
      }
    }
    else{
      $scope.loading = false;
      $scope.isHiddenLogIn = false;
      alert("Por favor ingrese su correo");
    }
  };          
}