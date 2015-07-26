'use strict';

/**
 * @ngdoc service
 * @name foodtrackwebApp.cacheEvents
 * @description
 * # cacheEvents
 * Factory in the foodtrackwebApp.
 */
angular.module('foodtrackwebApp')
  .factory('CacheEvents', function ($cacheFactory) {
    return $cacheFactory('all')
  });
