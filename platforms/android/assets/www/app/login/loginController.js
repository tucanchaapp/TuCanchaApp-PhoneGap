angular.module('tuCanchaApp').controller('loginController',loginController);

loginController.$inject = ['$scope','$location','$rootScope'];
   

function loginController($scope,$location,$rootScope){
    
     $scope.logIn = function () {
         Parse.User.logIn($scope.login_username, $scope.login_password, {
             
          success: function(user) {
              $rootScope.$apply(function() {
                $location.path('/reservationLanding');
                //console.log($location.path());
              });
          },
          error: function(user, error) {
            alert("Su usuario y contraseña no coinciden "+error);
          }
             
        })
     }
          
}