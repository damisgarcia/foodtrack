'use strict';

/**
 * @ngdoc filter
 * @name foodtrackwebApp.filter:isPassed
 * @function
 * @description
 * # isPassed
 * Filter in the foodtrackwebApp.
 */
angular.module('foodtrackwebApp')
  .filter('isPassed', function () {
    return function (input) {
      var ago = moment(input.end_date).startOf('day').fromNow()
      var isMatch = ago.match(/ago$/)
      return isMatch
    };
  });
