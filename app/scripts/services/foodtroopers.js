'use strict';

/**
 * @ngdoc service
 * @name foodtrackwebApp.Foodtroopers
 * @description
 * # Foodtroopers
 * Factory in the foodtrackwebApp.
 */
angular.module('foodtrackwebApp')
  .factory('Foodtroopers', function ($http,$window,$timeout) {
    var Foodtroopers = (function(){
      var self = {}
      // Service logic
      var domain = "http://madalice.herokuapp.com/api/v1/"

      self.Truck = {
        getAll: function(pages,callback) {
          var path = "trucks"
          var pagination = ""
          pages != null && pages != undefined ? pagination =  "?pages="+ pages : false
          $http.jsonp(domain + path + "?callback=JSON_CALLBACK").success(callback).error(HttpException);
        }
      }

      self.Maps = {
        resize: function(map,TIMEOUT){
          $timeout(function(){
            var styles = [{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":10},{"lightness":30},{"gamma":0.5},{"hue":"#435158"}]}]

            map.setOptions({
              styles: styles,
              scrollwheel: false,
              navigationControl: false,
              mapTypeControl: false,
              scaleControl: false,
              draggable: true,
              mapTypeControl: true,
              panControl: false,
              mapTypeControl: false,
              zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
              }
            })

            google.maps.event.trigger(map,'resize') // Repair Bug Map Grey Resize
          },TIMEOUT);
        },

        getUserLocation: function (callback,onFail) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              callback,
              function(error){
                self.Maps.navigatorGeoLocationException(error,onFail)
              }
            );
          } else {
            console.debug("Geo Location","Browser not supported this resource.")
          }
        },

        setMarkers: function(map){
          for(var truck in $window.trucks){
            if(truck.geolocation != null)
              var position =  new google.maps.LatLng(truck.geolocation.latitude,truck.geolocation.longitude)
              var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: truck.name
              })
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
