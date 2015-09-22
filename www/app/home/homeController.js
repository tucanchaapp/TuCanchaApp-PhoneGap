angular.module('mmTourApp').controller('homeController',homeController);

homeController.$inject = ['$scope'];
   

function homeController($scope){
    
    $scope.loadCities = function(country){
          $scope.country.name = country.name;
          if(country.id == 1){
              $scope.cities =[{name: 'Bogota',id: 1},{name: 'Medellin',id: 2}];
          }
          if(country.id == 2){
              $scope.cities =[{name: 'Caracas',id: 1},{name: 'Maracaibo',id: 2}];
          }
    }; // end save  

    $scope.countries =[{name: 'Colombia',id: 1},{name: 'Venezuela',id: 2}];
    $scope.country = { name: 'Pais',id: 0};
    $scope.city = { name: 'Ciudad',id: 0};
}