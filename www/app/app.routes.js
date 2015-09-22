// configure our routes
angular.module('mmTourApp').config(function($routeProvider) {
    $routeProvider

        // route for the about page
        .when('/', {
            templateUrl : 'app/home/home.html'
        })

        .otherwise({
          templateUrl: 'app/home/home.html',
          controller: function ($scope) {
                $scope.message = 'Welcome!!';
            }
        });
    


});