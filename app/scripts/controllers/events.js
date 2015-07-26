'use strict';

/**
 * @ngdoc function
 * @name foodtrackwebApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the foodtrackwebApp
 */
angular.module('foodtrackwebApp')
  .controller('EventsCtrl', function ($scope,$window,Foodtroopers,Preloader) {

    Preloader.initializer("#fff59d",30,null)

    // Requisitando a Localização do Usuário
    Foodtroopers.Maps.getUserLocation(function(position){
      $window.position = position.coords
      getEvents($window.position)
    },function(res){
      var position = {latitude: res.lat, longitude: res.lon}
      $window.position = position
      getEvents($window.position)
    });

    // privates
    function getEvents(position){
      // GET EVENTS by Locations
      Foodtroopers.Events.getAll(null,position.latitude,position.longitude,function(json){
        $scope.events = json
      })
    }
  });
