'use strict';

/**
 * @ngdoc service
 * @name foodtrackwebApp.Preloader
 * @description
 * # Preloader
 * Factory in the foodtrackwebApp.
 */
angular.module('foodtrackwebApp')
  .factory('Preloader', function ($interval,ngProgress) {
    var Preloader = (function(){
      var self = {}
      // Service logic
      self.initializer = function(progressColor,percentToComplete,callback) {
        // Pre Loader
        var pgColor = progressColor || "#337ab7"
        var toComplete = percentToComplete || 90
        ngProgress.color(pgColor)
        ngProgress.start()
        // Checando se a view terminou de carregar
        var statusProgress = $interval(ngProgressOnRun,100)

        function ngProgressOnRun() {
          if(ngProgress.status() >= toComplete ){
            ngProgress.complete()

            if(callback != undefined && callback != null)
              callback()

            $interval.cancel(statusProgress)
          }
        }
      }
    return self;
  }(Preloader));

  // Public API here
  return Preloader;
  });
