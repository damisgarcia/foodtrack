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
    'ngProgress',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider,uiGmapGoogleMapApiProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDL-Z0L2jI0A6QbqeYVV9FTXCbe5vrr1k8',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
       });
  });
