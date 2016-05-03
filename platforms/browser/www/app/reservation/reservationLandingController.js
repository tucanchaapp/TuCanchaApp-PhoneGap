angular.module('tuCanchaApp').controller('reservationLandingController',reservationLandingController);

reservationLandingController.$inject = ['$scope','reservationFactory','$location','$rootScope'];
   

function reservationLandingController($scope,reservationFactory,$location,$rootScope){

    var currentUser = Parse.User.current();
    $scope.user_name = currentUser.get("name"); 



    //BEGIN GOOGLE MAPS RELATED STUFF
    $scope.map = { center: { latitude: 4.6482836, longitude: -74.2482387 }, zoom: 6 };

    $scope.marker1 = {
       id: 1,
       coords: {
         latitude: 6.197908,
         longitude: -75.5589
       }, 
       message: "La Jaula Del Angel"
    };



    $scope.marker2 = {
       id: 2,
       coords: {
         latitude: 6.248461,
         longitude: -75.589649
       },
       message: "Soccer 70"
    };

    $scope.marker3 = {
       id: 3,
       coords: {
         latitude: 6.253798,
         longitude: -75.599601
       },
       message: "Il Campo"
    };

    $scope.marker4 = {
       id: 4,
       coords: {
         latitude: 6.246873,
         longitude: -75.589571
       },
       message: "Wembley"
    };

    $scope.marker5 = {
       id: 5,
       coords: {
         latitude: 6.13627,
         longitude: -75.39126
       },
       message: "Neon Soccer"
    };

    $scope.marker6 = {
       id: 6,
       coords: {
         latitude: 6.249364,
         longitude: -75.594193
       },
       message: "Soccerfit"
    };

    $scope.marker7 = {
       id: 7,
       coords: {
         latitude: 6.252657,
         longitude: -75.574109
       },
       message: "Elite Del Futbol"
    };

    $scope.marker8 = {
       id: 8,
       coords: {
         latitude: 10.447331,
         longitude: -73.261455
       },
       message: "Biblos Futbol"
    };

    $scope.marker9 = {
       id: 9,
       coords: {
         latitude: 10.421088,
         longitude: -75.538963
       },
       message: "La Terraza FC"
    };

    $scope.marker10 = {
       id: 10,
       coords: {
         latitude: 6.25744,
         longitude: -75.589571
       },
       message: "El Golazo"
    };

    $scope.marker11 = {
       id: 11,
       coords: {
         latitude: 6.181839,
         longitude: -75.587543
       },
       message: "Señor Gol"
    };

    $scope.marker12 = {
       id: 12,
       coords: {
         latitude: 6.188687,
         longitude: -75.58938
       },
       message: "Wellness Center"
    };

    $scope.marker13 = {
       id: 13,
       coords: {
         latitude: 6.260039,
         longitude: -75.569753
       },
       message: "Los Estadios"
    };




   

 



    // var Venue = Parse.Object.extend("Venue");


    // var query = new Parse.Query(Venue);


   
    // query.find({
    //   success: function(venueLocations) {

    //     var venueNames = new Array();
    //     var venueLatitudes = new Array();
    //     var venueLongitudes = new Array();

    //     for (var i = 0; i < venueLocations.length; i++) {

    //       var eachVenue = venueLocations[i];
    //       var eachVenueLocation = eachVenue.get('Location');
    //       var point = new Parse.GeoPoint(eachVenueLocation);

    //       venueNames.push(eachVenue.get('Name'));
    //       venueLatitudes.push(point.latitude);
    //       venueLongitudes.push(point.longitude);

    //       $scope.marker = {
    //         id: i,
    //         coords: {
    //           latitude: venueLatitudes[i],
    //           longitude: venueLongitudes[i]
    //           },
    //           message: venueNames[i]
    //       }

    //       console.log("Item número: " + i + "-"+ "Nombre: " + venueNames[i] + "-" + "Longitud: " + venueLongitudes[i] + "-" + "Latitud: " + venueLatitudes[i]);

   
    //     }

    //   }
    // });



    //END GOOGLE MAPS RELATED STUFF


    $scope.logOut = function(){
        Parse.User.logOut();
        $rootScope.currentUser = null;
        $scope.currentUser = null;
        $location.path('/login');
    }
   
    $scope.isHidden = false;
    $scope.checkAvailableFilds = function () {
        $scope.isHidden = true;
        $scope.fields = [];
        if($scope.data != undefined){
            
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
                    $scope.isHidden = false;
                    if (error.code == 3){
                        alert("El tiempo de expera ha expirado \n si el prolema persiste reinicie su equipo")
                    }
                    alert('code: '    + error.code    + '\n' +
                          'message: ' + error.message + '\n');
            }, {timeout:15000, enableHighAccuracy: true});
                
        }else{
            $scope.isHidden = false;
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
