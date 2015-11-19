angular.module('tuCanchaApp').factory('appFactory', appFactory);

appFactory.$inject = ['$q'];

function appFactory($q) {
    
   
    return {
        getLocationInfo: function(lat, lon){
            var defer = $q.defer();

            $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {           
                defer.resolve(data)
                return data               
            },function onError(error) {
                 defer.reject(error)
            })
                
            return defer.promise;

        }
        
    }
    
}
