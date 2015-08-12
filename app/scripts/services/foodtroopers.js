'use strict';

/**
 * @ngdoc service
 * @name foodtrackwebApp.Foodtroopers
 * @description
 * # Foodtroopers
 * Factory in the foodtrackwebApp.
 */
angular.module('foodtrackwebApp')
  .factory('Foodtroopers', function ($http,$window,$timeout,$q) {
    var Foodtroopers = (function(){
      var self = {}
      // Service logic
      var domain = "http://madalice.herokuapp.com/api/v1/"

      self.Truck = {
        getAll: function(latitude,longitude,pages,callback) {
          var path = "trucks?"
          var query = ""
          // Build Query
          query = domain + path
          if (pages != null && pages != undefined)
            query += "pages="+pages
          if ( (latitude != null && latitude != undefined) && (longitude != null && longitude != undefined) )
            query += "&latitude="+latitude
            query += "&longitude="+longitude

          query.search("\&") != -1 ? query += "&callback=JSON_CALLBACK" : query += "callback=JSON_CALLBACK"

          $http.jsonp(query).success(callback).error(HttpException);
        }
      },

      self.Events = {
        getAll: function(pages,latitude,longitude,callback){
          var path = "events?"
          var query = ""
          // Build Query
          query = domain + path
          if (pages != null && pages != undefined)
            query += "pages="+pages
          if ( (latitude != null && latitude != undefined) && (longitude != null && longitude != undefined) )
            query += "&latitude="+latitude
            query += "&longitude="+longitude

          query.search("\&") != -1 ? query += "&callback=JSON_CALLBACK" : query += "callback=JSON_CALLBACK"

          $http.jsonp(query).success(callback).error(HttpException);
        }
      },

      self.Maps = {
        getUserLocation: function (callback,onFail) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                callback
              ,
              function(error){
                self.Maps.navigatorGeoLocationException(error,function(){
                  $http.jsonp("http://ip-api.com/json/?callback=JSON_CALLBACK").success(function(data){
                    onFail(data)
                  })
                })
              }
            );
          }
          else {
            console.debug("Geo Location","Browser not supported this resource.")
          }
        },

        navigatorGeoLocationException: function(error,callback){
          switch(error.code) {
            case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.")
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.")
              break;
            case error.TIMEOUT:
              console.log("The request to get user location timed out.")
              break;
            case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.")
              break;
          }
          callback()
        }        
      }
    // private
    function HttpException(data, status){
      return { error:data, status: status }
    }

    return self;
  }(Foodtroopers));

  // Public API here
  return Foodtroopers;
});
