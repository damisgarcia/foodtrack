'use strict';

/**
 * @ngdoc function
 * @name foodtrackwebApp.controller:PolltruckersCtrl
 * @description
 * # PolltruckersCtrl
 * Controller of the foodtrackwebApp
 */
angular.module('foodtrackwebApp')
  .controller('PolltruckersCtrl', function ($scope,$http,Foodtroopers) {
    $scope.trucks = null
    $scope.poll_xml_result = null
    // Call Poll
    Foodtroopers.Truck.getAll(null, function(json){
      $scope.trucks = json
    })
  })
  .directive('pollTruckers', function(){
    return {
      templateUrl: 'templates/pollTruckers.html',
      restrict: 'E'
    };
  })
  .directive('pollResultWeekTruckers', function(){
    return {
      templateUrl: 'templates/pollResultWeekTruckers.html',
      restrict: 'E'
    };
  })
  .directive('pollResultWeekTruckersByTroopers', function(){
    return {
      templateUrl: 'templates/pollResultWeekTruckersByTroopers.html',
      restrict: 'E'
    };
  })
