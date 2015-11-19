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
        getReservations: function(reservationDate,city){
        
            var defer = $q.defer();

            var Reservation = Parse.Object.extend("Reservation");
            var Field = Parse.Object.extend("Field");
            var innerQuery = new Parse.Query(Field);
            innerQuery.equalTo("city",city);
            
            
            var query = new Parse.Query(Reservation);
            query.matchesQuery("fieldId",innerQuery);
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
