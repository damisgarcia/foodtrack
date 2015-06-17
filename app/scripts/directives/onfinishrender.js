'use strict';

/**
 * @ngdoc directive
 * @name foodtrackwebApp.directive:onfinishrender
 * @description
 * # onfinishrender
 */
angular.module('foodtrackwebApp')
  .directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    };
  });
