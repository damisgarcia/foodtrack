'use strict';

/**
 * @ngdoc service
 * @name foodtrackwebApp.instagram
 * @description
 * # instagram
 * Factory in the foodtrackwebApp.
 */
angular.module('foodtrackwebApp')
  .factory('Instagram', function ($http) {
    // Public API here
    var Instagram = (function(){
      var self = {}
      self.client_id = "84bd1904716642618d8a9efb915f7455"

      self.getRecentMediasById = function(user_id,callback){
        var query = "https://api.instagram.com/v1/users/"+ user_id +"/media/recent?client_id="+self.client_id+"&callback=JSON_CALLBACK"
        $http.jsonp(query).success(callback).error(HttpException)
      }

      // private
      function HttpException(data, status, headers, config){
        return { error:data, status: status }
      }
      // https://api.instagram.com/v1/users/1762691017/media/recent?client_id=84bd1904716642618d8a9efb915f7455
      return self
    }(Instagram));

    return Instagram;
  });
