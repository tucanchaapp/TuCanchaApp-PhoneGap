angular.module('tuCanchaApp').controller('reservationLandingController',reservationLandingController);

reservationLandingController.$inject = ['$scope','reservationFactory','$location','$rootScope', '$http'];
   

function reservationLandingController($scope,reservationFactory,$location,$rootScope){

    var currentUser = Parse.User.current();
    $scope.user_name = currentUser.get("name"); 
    $scope.map = { center: { latitude: 4.6482836, longitude: -74.2482387 }, zoom: 6 };

    




    $scope.logOut = function(){
        Parse.User.logOut();
        $rootScope.currentUser = null;
        $scope.currentUser = null;
        $location.path('/login');
    }
   
    $scope.isHidden = false;
    $scope.resultIsHidden = true;

    $scope.reSearch = function(){
      $scope.isHidden = false;
      $scope.resultIsHidden = true;
      $scope.loading = false;
    }


    $scope.data = { active: false };
    

    $scope.VenuesInfo = function (){

      reservationFactory.getVenues().then(function(venues){
        json_fields = [];

        for (var i = 0; i < venues.length; i++) {
            var venue = venues[i];
              var json_field = {}

              json_field ["city"]    = venue.get('City')
              json_field ["logo"]    = venue.get('mediaId').get('logo')._url
              json_field ["name"] = venue.get('Name')                                        
              json_field ["phone"]      = venue.get('Phone')
              json_field ["address"]      = venue.get('Address')
              json_field ["open"]      = venue.get('open')
              json_field ["close"]      = venue.get('close')
              json_field ["fieldsNum"]      = venue.get('Fields')
              json_field ["coords"]      = venue.get('Location')

              json_fields.push(json_field);
        }
        $scope.venues=json_fields
        console.log($scope.venues);
      })

    }







    $scope.checkAvailableFilds = function () {
        $scope.loading = true;
        $scope.isHidden = true;
        $scope.resultIsHidden = false;
        $scope.fields = [];
        if($scope.data != undefined){
            
            navigator.geolocation.getCurrentPosition(function(position) {
                
              if ($scope.data.dateDropDownInput == undefined) {
                alert("Por favor seleccione una fecha en su busqueda");
                $scope.isHidden = false;
                $scope.loading = false;
                $scope.resultIsHidden = true;
              }

              else{



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
                                    
                                    if($.inArray(field.id,reservationsIds) < 0 && fieldDistance <= 100){
                                        var json_field = {}

                                        json_field ["name"]    = field.get('name')   
                                        json_field ["company"] = field.get('venueId').get('Name')                                        
                                        json_field ["id"]      = field.id
                                        json_field ["type"]      = field.get('type')

                                        json_fields.push(json_field);
                                    }

                                }

                                $scope.fields=json_fields;
                                $scope.loading = false;

                            })         

                 

                   })
                }

         

            },function onError(error) {
                    $scope.isHidden = false;
                    if (error.code == 3){
                        alert("El tiempo de espera ha expirado \n ")
                    }
                    alert('code: '    + error.code    + '\n' +
                          'message: ' + error.message + '\n');
            }, {timeout:15000, enableHighAccuracy: true});
                
        }else{
            alert("Por favor seleccione una fecha");
            $scope.isHidden = false;
            
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

    $scope.myReservations = function(){

      reservationFactory.getMyReservations().then(function(reservations){
        json_fields = [];

        for (var i = 0; i < reservations.length; i++) {
            var reservation = reservations[i];
              var json_field = {}


              json_field ["date"]  = moment(reservation.get('date')).format('MMMM Do YYYY, h:mm a')
              json_field ["playerId"]  = reservation.get('playerId')
              json_field ["fieldId"]  = reservation.get('fieldId')
              json_field ["fieldName"]  = reservation.get('fieldId').get('name')
              json_field ["venueName"]  = reservation.get('fieldId').get('venueId').get('Name')

              json_fields.push(json_field);
        }
        $scope.reservations=json_fields
        console.log($scope.venues);
      })

    }


    
    
    $scope.makeAReservation = function (field) {
        console.log('Make reservation triggered');
        
        if (confirm('Esta seguro que quiere reservar la ' + field.name + ' en ' + field.company + ' para la fecha '+moment($scope.data.dateDropDownInput.getTime()).format('MMMM Do YYYY, h:mm a')+' ?')) { 

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
                alert(Parse.User.current().get("name") + ' tu reserva fue exitosa!');
              },
              error: function(reservation, error) {

                alert('Failed to create new object, with error code: ' + error.message);
              }
            });
            
        }
                
    }
    
    

}
