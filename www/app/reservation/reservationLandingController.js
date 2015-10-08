angular.module('tuCanchaApp').controller('reservationLandingController',reservationLandingController);

reservationLandingController.$inject = ['$scope','$location'];
   

function reservationLandingController($scope){

    var currentUser = Parse.User.current();
    $scope.user_name =currentUser.get("name"); 
  
}

