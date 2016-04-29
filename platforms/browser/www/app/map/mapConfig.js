angular.module('myApplicationModule', ['uiGmapgoogle-maps']).config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true
        });
    }]
);