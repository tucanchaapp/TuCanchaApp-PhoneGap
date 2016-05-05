//Creating tuCanchaApp AngularJs app with it's dependencies.
angular.module('tuCanchaApp', ['ui.bootstrap.datetimepicker','ngRoute', 'ngMaterial', 'uiGmapgoogle-maps'])

	.directive('loading', function () {
	    return {
	      restrict: 'E',
	      replace:true,
	      template: '<div class="loading"><br><br><br><center><img src="img/spinner.gif"/></center><br><center><p> </p></center></div>',
	      link: function (scope, element, attr) {
	            scope.$watch('loading', function (val) {
	                if (val)
	                    $(element).show();
	                else
	                    $(element).hide();
	            });
	      }
	    }
	})
;