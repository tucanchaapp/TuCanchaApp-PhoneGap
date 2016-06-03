angular.module('tuCanchaApp').factory('reservationFactory', reservationFactory);

reservationFactory.$inject = ['$q'];

function reservationFactory($q) {
    
   
    return {
        getFields: function(){
            var defer = $q.defer();

            var fieldObject = Parse.Object.extend("Field");
            var query = new Parse.Query(fieldObject);
            query.include("venueId");
            query.limit(1000);
            
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

        getVenues: function(){
            var defer = $q.defer();

            var venueObject = Parse.Object.extend("Venue");
            var query = new Parse.Query(venueObject);
            

            query.include("mediaId");
            query.limit(1000);
            
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

            var Reservation = Parse.Object.extend("Reservation");                                    
            var query = new Parse.Query(Reservation);
            query.equalTo("date", reservationDate);   
            query.limit(1000);       




    
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

        getMyReservations: function(){

            var defer = $q.defer();

            var Reservation = Parse.Object.extend("Reservation");                                    
            var query = new Parse.Query(Reservation);
            
        
            
            var currentUserId = Parse.User.current(); 
            query.equalTo('playerId', currentUserId);
            query.include("fieldId").include("venueId");
            query.notEqualTo('userCancelled', true);
            query.notEqualTo('venueCancelled', true);
            query.limit(1000);

                           
        
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
