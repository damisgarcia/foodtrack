'use strict';

/**
 * @ngdoc function
 * @name foodtrackwebApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the foodtrackwebApp
 */
angular.module('foodtrackwebApp')
  .controller('EventsCtrl', function ($scope,$rootScope,Foodtroopers,Preloader) {

    Preloader.initializer(null,30,function(){
      if($rootScope.$loaded == null || $rootScope.$loaded == undefined)
        $rootScope.$loaded = true

        $('#events').isotope({
          itemSelector: '.item',
          masonry: {
            columnWidth: '.item'
          }
        });
    })

    try{
      getEvents($rootScope.$position)
    }
    catch(e){
      $rootScope.location_defer.promise.then(function(resolve){
        getEvents($rootScope.$position)
      })
    }

    // privates
    function getEvents(position){
      // GET EVENTS by Locations
      if($rootScope.$e == null || $rootScope.$e == undefined){
        Foodtroopers.Events.getAll(null,position.latitude,position.longitude,function(json){
          $scope.events = json
        })
      } else {
        $scope.events = $rootScope.$e
      }
    }
  });
