'use strict';

/**
 * @ngdoc function
 * @name foodtrackwebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the foodtrackwebApp
 */
angular.module('foodtrackwebApp')
  .controller('AboutCtrl', function ($scope,Preloader) {
    Preloader.initializer("#f57c00",30,null)
  });
