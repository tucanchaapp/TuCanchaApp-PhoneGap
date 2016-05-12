//Creating tuCanchaApp AngularJs app with it's dependencies.
angular.module('tuCanchaApp', ['ui.bootstrap.datetimepicker','ngRoute', 'ngMaterial', 'uiGmapgoogle-maps'])

	.directive('loading', function () {
	    return {
	      restrict: 'E',
	      replace:true,
	      template: '<div ><div class="loading"><br><br><br><center><img src="img/spinner.gif"/></center><br><center><p> </p></center></div></div>',
	      link: function (scope, element, attr) {
	            scope.$watch('loading', function (val) {
	            	console.log('SPINNINGGGG');
	                if (val)
	                    $(element).show();
	                else
	                    $(element).hide();
	            });
	      }
	    }
	})

	.directive('loading2', function () {
	    return {
	      restrict: 'E',
	      replace:true,
	      template: '<div><div class="loading"><br><br><br><center><img src="img/ripple.gif"/></center><br><center><h3> Iniciando Sesión </h3></center></div></div>',
	      link: function (scope, element, attr) {
	            scope.$watch('loading', function (val) {
	            	console.log('SPINNINGGGG');
	                if (val)
	                    $(element).show();
	                else
	                    $(element).hide();
	            });
	      }
	    }
	})

	.directive('loading3', function () {
	    return {
	      restrict: 'E',
	      replace:true,
	      template: '<div><div class="loading"><br><br><br><center><img src="img/ripple.gif"/></center><br><center><h3> Registrándote </h3></center></div></div>',
	      link: function (scope, element, attr) {
	            scope.$watch('loading', function (val) {
	            	console.log('SPINNINGGGG');
	                if (val)
	                    $(element).show();
	                else
	                    $(element).hide();
	            });
	      }
	    }
	})

;