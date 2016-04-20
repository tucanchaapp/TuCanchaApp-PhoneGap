angular.module('tuCanchaApp').controller('reservationLandingController',reservationLandingController);

reservationLandingController.$inject = ['$scope','reservationFactory','usSpinnerService'];
   

function reservationLandingController($scope,reservationFactory,usSpinnerService){

    var currentUser = Parse.User.current();
    $scope.user_name = currentUser.get("name"); 
   
    
    $scope.checkAvailableFilds = function () {
        $scope.fields = [];
        if($scope.data != undefined){
            usSpinnerService.spin('spinner-1');
            navigator.geolocation.getCurrentPosition(function(position) {
                

                                                                                                                                                                                                                                         reservationFactory.getReservations($scope.data.dateDropDownInput.getTime()).then(function(reservations){

                            var reservationsIds = []
                            for (var i = 0; i < reservations.length; i++) {
                                reservationsIds.push(reservations[i].get('fieldId').id)                                
                            }

                            reservationFactory.getFields().then(function(fields){
                                json_fields = [];
                                             
                                for (var i = 0; i < fields.length; i++) {
                                    var field = fields[i];
                                    var fieldGeoPoint = new Parse.GeoPoint(field.get('venueId').get('Location'));                       
                                    var fieldDistance = distance(position.coords.latitude, position.coords.longitude, fieldGeoPoint.latitude, fieldGeoPoint.longitude, "K");
                                    
                                    if($.inArray(field.id,reservationsIds) < 0 && fieldDistance <= 40){
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
             

            },function onError(error) {
                    if (error.code == 3){
                        alert("El tiempo de expera ha expirado \n si el prolema persiste reinicie su equipo")
                    }
                    alert('code: '    + error.code    + '\n' +
                          'message: ' + error.message + '\n');
            }, {timeout:15000, enableHighAccuracy: true});
            usSpinnerService.stop('spinner-1');      
        }else{
            alert("Por favor seleccione una fecha")
        }
    }
    
    
    function distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist
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
