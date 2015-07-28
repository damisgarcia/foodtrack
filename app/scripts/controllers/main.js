'use strict';

/**
 * @ngdoc function
 * @name foodtrackwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foodtrackwebApp
 */
angular.module('foodtrackwebApp')
  .controller('MainCtrl',
    function(
      $scope,
      $rootScope,
      $window,
      $timeout,
      Instagram,
      Foodtroopers,
      Preloader,
      uiGmapGoogleMapApi,
      uiGmapIsReady ) {
    $scope.city = "Fortaleza"
    $scope.posts = {
      grids:[
        { objects:[], likes:0 },{objects:[], likes:0},{ objects:[], likes:0 }
      ]
    }

    $scope.isModalEnable = false
    $scope.isMapPromoVisible = true
    $scope.limit = 2

    // Filters
    $scope.EventIsConfirmed = function(item){
      return item.confirmed == true
    }

    var styles = [{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":10},{"lightness":30},{"gamma":0.5},{"hue":"#435158"}]}]
    var gmaps_options = {
      styles: styles,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true,
      mapTypeControl: true,
      panControl: false,
      mapTypeControl: false
    }

    $scope.map = { zoom: 14, places:[], options: gmaps_options }

    $scope.showTreadingTopicsModal = function(){
      $scope.isModalEnable = true
      $scope.limit = 2
      $('#treadingTopicsModal').modal({keyboard:false})

      if(!$scope.$$phase) {
        $scope.$apply(); //update view
      }
    }

    $scope.hideTreadingTopicsModal = function(){
      $scope.isModalEnable = false
    }

    $scope.closeMapPromo  = function () {
      $scope.isMapPromoVisible = false
    }

    // Requisitando a Localização do Usuário
    Foodtroopers.Maps.getUserLocation(function(position){
      $scope.map.center = position.coords
      $window.position = position.coords
      getTrucks($window.position)
      getEvents($window.position)
    },function(res){
      var position = {latitude: res.lat, longitude: res.lon}
      $scope.map.center =  position
      $scope.city = res.city
      $window.position = position
      getTrucks($window.position)
      getEvents($window.position)
    });

    // Iniciando Preloader
    Preloader.initializer("#ffffff",null,function() {
      if($rootScope.$loaded == null || $rootScope.$loaded == undefined)
        $rootScope.$loaded = true
    })

    // Resize Maps
    uiGmapIsReady.promise(1).then(function(instances) {
      $scope.maps = instances
    });

    // private

    // Embaralhando Array
    function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }

    // GET Locations for Trucks
    function getTrucks(position){
      Foodtroopers.Truck.getAll(null,position.latitude,position.longitude, function(json){
        $scope.trucks = json
        console.log($scope.trucks)
        var count = 0
        var minLikes = 20
        angular.forEach($scope.trucks,function(truck,index,_array){
          // Requisitando Postagem Instargram
          Instagram.getRecentMediasById(truck.social_media.instagram.id,function(result, status, headers, config){
            angular.forEach(result.data,function(media,index){
              try{
                if(media.likes.count > minLikes){
                  $scope.posts.grids[count].objects.push(media)
                  count == 2 ? count = 0 : count++
                }
              } catch(e){
                // none
              }
            })

            if(index == (_array.length - 1))
              angular.forEach($scope.posts.grids,function(grid,index){
                $scope.posts.grids[index].objects = shuffle(grid.objects)
              })

          })

          if(!$scope.$$phase){
            $scope.$apply() //update view
          }
        })
      });
    }

      function getEvents(position){
        // GET EVENTS by Locations
        Foodtroopers.Events.getAll(null,position.latitude,position.longitude,function(json){
          $scope.events = json
          // Quando Google Maps Loaded
          uiGmapGoogleMapApi.then(function(maps) {
            angular.forEach($scope.events, function($event,index){
              if($event.geolocation != null){
                $scope.map.places.push({
                  idKey:index,
                  latitude:$event.geolocation.latitude,
                  longitude:$event.geolocation.longitude
                })
              }
            })
          });
        })
      }

  })

  .directive("onScroll",function($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var raw = element[0]
        element.bind("scroll", function() {
          if(raw.scrollTop + raw.offsetHeight >= raw.scrollHeight){
            scope.limit++
            if(!scope.$$phase)
              scope.$apply() //update view
          }
        });
      }
    };
  })
