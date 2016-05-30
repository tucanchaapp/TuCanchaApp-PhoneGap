angular.module('tuCanchaApp').controller('passwordRecoveryController',loginController);

loginController.$inject = ['$scope','$http'];


function loginController($scope,$http){

	var recoveryMail =document.getElementsByName("recoveryMail").value;


	$scope.recoverPass = function(){


		
		    
    	Parse.User.requestPasswordReset($scope.recovery_mail, {
    	  success: function() {
    	  // Password reset request was sent successfully
    	  	alert('Te hemos enviado un Mail a ' + $scope.recovery_mail + ' para que cambies tu contaseña.');
    	  },
    	  error: function(error) {
    	    // Show the error message somewhere
    	    alert('Oops, ese correo no existe, porfavor regístrate o intenta de nuevo.');
    	  }
    	});
	}
}




