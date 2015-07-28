'use strict';

/**
 * @ngdoc overview
 * @name foodtrackwebApp
 * @description
 * # foodtrackwebApp
 *
 * Main module of the application.
 */
angular
  .module('foodtrackwebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngProgress',
    'uiGmapgoogle-maps'
  ])
  .config(function ($stateProvider,$urlRouterProvider,$provide,uiGmapGoogleMapApiProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('events', {
        url: '/events',
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl'
      })

      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDL-Z0L2jI0A6QbqeYVV9FTXCbe5vrr1k8',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
       });

      //  autoscroll ui-view
      $provide.decorator('$uiViewScroll', function ($delegate) {
        return function (uiViewElement) {
          window.scrollTo(0, 0);
        };
      });
  })

  .run(function($rootScope,$q,$state,Foodtroopers){
    $rootScope.$state = $state

    // get user position
    $rootScope.location_defer = $q.defer() // to sync method
    Foodtroopers.Maps.getUserLocation(function(position){
      $rootScope.$position = position.coords
      $rootScope.location_defer.resolve('done')
      $rootScope.location_promise = $rootScope.location_defer.promise
    },function(res){
      var position = {latitude: res.lat, longitude: res.lon}
      $rootScope.$position = position.coords
      $rootScope.$city = res.city
      $rootScope.location_defer.resolve('done')
      $rootScope.location_promise = $rootScope.location_defer.promise
    });
  });
