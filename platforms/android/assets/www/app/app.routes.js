



// configure our routes
angular.module('tuCanchaApp').config(function($routeProvider) {




    $routeProvider

        // route for the about page
        .when('/', {
            templateUrl : 'app/login/login.html',
            controller: 'loginController'
        })
    
        .when('/setUpAccount', {
            templateUrl : 'app/setUpAccount/setUpAccount.html'        
        })
    
        .when('/login', {
            templateUrl : 'app/login/login.html',
            controller: 'loginController'     
        })
    
        .when('/reservationLanding', {
            templateUrl : 'app/reservation/reservationLanding.html',
            controller  : 'reservationLandingController'
        })

        .otherwise({
          templateUrl: 'app/home/home.html',
          controller: function ($scope) {
                $scope.message = 'Welcome!!';
            }
        });
    


});