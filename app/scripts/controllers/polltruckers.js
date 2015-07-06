'use strict';

/**
 * @ngdoc function
 * @name foodtrackwebApp.controller:PolltruckersCtrl
 * @description
 * # PolltruckersCtrl
 * Controller of the foodtrackwebApp
 */
angular.module('foodtrackwebApp')
  .controller('PolltruckersCtrl', function ($scope,$http,$window,Foodtroopers) {
    $scope.trucks = null
    $scope.poll_xml_result = null
    // Call Poll
    Foodtroopers.Truck.getAll(null, function(json){
      $scope.trucks = json
      $window.trucks = json
    })
  })
  .directive('pollTruckers', function(){
    return {
      templateUrl: 'templates/pollTruckers.html',
      restrict: 'E'
    };
  })
