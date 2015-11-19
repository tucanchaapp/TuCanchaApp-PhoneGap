angular.module('tuCanchaApp').controller('reservationLandingController',reservationLandingController);

reservationLandingController.$inject = ['$scope','reservationFactory','appFactory','usSpinnerService'];
   

function reservationLandingController($scope,reservationFactory,appFactory,usSpinnerService){

    var currentUser = Parse.User.current();
    $scope.user_name = currentUser.get("name"); 
   
    
    $scope.checkAvailableFilds = function () {
        usSpinnerService.spin('spinner-1');
        navigator.geolocation.getCurrentPosition(function(position) {
                    
            appFactory.getLocationInfo(position.coords.latitude,position.coords.longitude).then(function(locationData){
                                                                                                                                                                                                                                        reservationFactory.getReservations($scope.data.dateDropDownInput.getTime(),locationData.address.city).then(function(reservations){

                        var reservationsIds = []
                        for (var i = 0; i < reservations.length; i++) {
                           
                            reservationsIds.push(reservations[i].get('fieldId').id)                                
                        }


                        reservationFactory.getFields().then(function(fields){
                            json_fields = [];

                            for (var i = 0; i < fields.length; i++) {
                                var field = fields[i];

                                if($.inArray(field.id,reservationsIds) < 0){
                                    var json_field = {}

                                    json_field ["name"]    = field.get('name')   
                                    json_field ["company"] = field.get('venueId').get('Name')                                        
                                    json_field ["id"]      = field.id

                                    json_fields.push(json_field);
                                }

                            }

                            $scope.fields=json_fields;

                        })         

                })
                    
            });
                
                
        
                
        },function onError(error) {
                alert('code: '    + error.code    + '\n' +
                      'message: ' + error.message + '\n');
        });
        usSpinnerService.stop('spinner-1');      
    }
    
    
    $scope.makeAReservation = function (field) {
        
        if (confirm('Esta seguro que quiere reservar la ' + field.name + ' en ' + field.company + '?')) { 

            var Reservation = Parse.Object.extend("Reservation");
            var reservation = new Reservation();

            reservation.set("date", $scope.data.dateDropDownInput.getTime());
            
            var Field = Parse.Object.extend("Field");
            var fieldParseObject = new Field();
            fieldParseObject.id = field.id;
            reservation.set("fieldId", fieldParseObject);            
            
            reservation.set("playerId", Parse.User.current());
            
            
            reservation.save(null, {
              success: function(reservation) {
                // Execute any logic that should take place after the object is saved.
                alert(Parse.User.current().get("name") + ' tu reserva fue exitosa!');
              },
              error: function(reservation, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
              }
            });
            
        }
                
    }
    
    

}
