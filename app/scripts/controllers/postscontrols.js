'use strict';

/**
 * @ngdoc function
 * @name foodtrackwebApp.controller:PostscontrolsCtrl
 * @description
 * # PostscontrolsCtrl
 * Controller of the foodtrackwebApp
 */
angular.module('foodtrackwebApp')
  .controller('PostsControlsCtrl', function ($scope,$interval) {
    var press_interval = null

    $scope.move = function (signal) {
      action(signal)
      press_interval = $interval(action(signal),100)
    }

    $scope.clear = function(){
      $(".last-posts").stop()
      $interval.cancel(press_interval)
    }

    function action(signal) {
      $(".last-posts").animate( { scrollTop: signal+"=300" },'slow',"swing" )
    }

  });
