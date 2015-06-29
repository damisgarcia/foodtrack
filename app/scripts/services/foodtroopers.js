'use strict';

/**
 * @ngdoc service
 * @name foodtrackwebApp.Foodtroopers
 * @description
 * # Foodtroopers
 * Factory in the foodtrackwebApp.
 */
angular.module('foodtrackwebApp')
  .factory('Foodtroopers', function ($http,$resource) {
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
          callback([{id:1,name:"Truck 1"},{id:2,name:"Truck 2"},{id:3,name:"Truck 3"}])
        }
      }
    // private
    function HttpException(data, status){
      console.log(data)
      return { error:data, status: status }
    }

    return self;
  }(Foodtroopers));

  // Public API here
  return Foodtroopers;
});
