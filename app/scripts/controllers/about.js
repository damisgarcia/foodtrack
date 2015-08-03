'use strict';

/**
 * @ngdoc function
 * @name foodtrackwebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the foodtrackwebApp
 */
angular.module('foodtrackwebApp')
  .controller('AboutCtrl', function ($scope,$rootScope,Preloader) {
    Preloader.initializer(null,30,function(){
      if($rootScope.$loaded == null || $rootScope.$loaded == undefined)
        $rootScope.$loaded = true
    })
  });
