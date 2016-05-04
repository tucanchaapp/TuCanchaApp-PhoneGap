// angular.module('tuCanchaApp', [])
//   .directive('loading', function () {
//       return {
//         restrict: 'E',
//         replace:true,
//         template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
//         link: function (scope, element, attr) {
//               scope.$watch('loading', function (val) {
//                   if (val)
//                       $(element).show();
//                   else
//                       $(element).hide();
//               });
//         }
//       }
//   })
  // .controller('spinnerController', function($scope, $http) {
  //     $scope.cars = [];
      
  //     $scope.initializeSpinner = function() {
  //       $scope.loading = true;
  //       $http.get('test.json')
  //         .success(function(data) {
  //           $scope.cars = data[0].cars;
  //           $scope.loading = false;
  //       });
  //     }
      
  // });