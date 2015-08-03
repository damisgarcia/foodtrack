'use strict';

/**
 * @ngdoc directive
 * @name foodtrackwebApp.directive:socialMidiaPromo
 * @description
 * # socialMidiaPromo
 */
angular.module('foodtrackwebApp')
  .directive('socialMidiaPromo', function () {
    return {
      templateUrl: 'views/templates/social_media_promo.html',
      restrict: 'E',
      link: function (scope,$window) {
        // initializer facebook  sdk
        $window.fbAsyncInit = function() {
          FB.init({
            appId      : '1454454404860113',
            xfbml      : true,
            version    : 'v2.4'
          });
        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));

      }
    };
  });
