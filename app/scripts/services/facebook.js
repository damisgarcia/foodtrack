'use strict';

/**
 * @ngdoc service
 * @name foodtrackwebApp.Facebook
 * @description
 * # Facebook
 * Factory in the foodtrackwebApp.
 */
angular.module('foodtrackwebApp')
  .factory('Facebook', function ($http) {

    var Facebook = (function(){
      var self = {}
      // Service logic
      var domain = "https://graph.facebook.com/"
      var version = "v2.1/"
      var accessToken = "494196217405022|o40ok_IbWRmbn40eLOowbeVaqSw"          

      self.getPostsFanPage = function (FanPageId,limit,callback) {
        var path = "/posts?"
        if(FanPageId != undefined || FanPageId != null){
          $http.get( domain + version + FanPageId + path + limit +"&"+ "access_token=" + accessToken )
          .success(callback)
          .error(HttpException)
        }
      }

      self.getImageFromPost = function (objectID,callback) {
        if(objectID != undefined || objectID != null){
          $http.get( domain + version + objectID + "?" + "access_token=" + accessToken )
          .success(callback)
          .error(HttpException)
        }
      }

      self.getTotalLikesFromPost = function (objectID,callback) {
        $http.get( domain + version + objectID + "likes" + "?" + "access_token=" + accessToken )
        .success(callback)
        .error(HttpException)
      }

      // private
      function HttpException(data, status, headers, config){
        return { error:data, status: status }
      }
      return self;
    }(Facebook));

    // Public API here
    return Facebook;
  });
