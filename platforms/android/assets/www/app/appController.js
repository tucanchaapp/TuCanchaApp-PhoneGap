angular.module('tuCanchaApp').controller('appController',appController);

appController.$inject = ['$scope','$location'];
   
function appController($scope,$location){
    
    $scope.go = function ( path ) {
      $location.path( path );
    };
    
    Parse.initialize("o8lhQYrP5N9xy46JShFCZzgpnzpfPGsJs2hhyD04","GqIt96C4hSl3aPU3DBgAga9AoHegDKKdWmEh1IJR");

}

