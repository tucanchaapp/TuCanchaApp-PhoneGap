angular.module('tuCanchaApp').factory('reservationFactory', reservationFactory);

reservationFactory.$inject = ['$q'];

function reservationFactory($q) {
    
   
    return {
        getFields: function(){
            var defer = $q.defer();

            var fieldObject = Parse.Object.extend("Field");
            var query = new Parse.Query(fieldObject);
            query.include("venueId")
            
            query.find( {        
                success: function(results) {
                    defer.resolve(results)
                    return results                    
                },
                error: function(object, error) {
                    defer.reject(error)
                }
            });

            return defer.promise;

        },
        getReservations: function(reservationDate){
        
            var defer = $q.defer();

            var fieldObject = Parse.Object.extend("Reservation");
            var query = new Parse.Query(fieldObject);
            query.equalTo("date", reservationDate);
     
            
            query.find( {        
                success: function(results) {
                    defer.resolve(results)
                    return results                    
                },
                error: function(object, error) {
                    defer.reject(error)
                }
            });

            return defer.promise;

        }
        
    }
    
}