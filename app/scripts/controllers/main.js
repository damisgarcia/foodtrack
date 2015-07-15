'use strict';

/**
 * @ngdoc function
 * @name foodtrackwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foodtrackwebApp
 */
angular.module('foodtrackwebApp')
  .controller('MainCtrl', function ($scope,$window,$timeout,Facebook,Foodtroopers,Preloader,uiGmapGoogleMapApi,uiGmapIsReady) {
    // Fan Pages
    // BrasilFoodTrucks:"244576275632539"
    // GuiaFoodTrucks:"1491757611043874"
    // Dindin do Brilho 243727072484890
    // Coktelitas Drinks E Cocktails 263020680391340
    // Coktelitas Seu Pudim 1709247265967710
    // Citron Patisserie 1511651809096678
    // Pão do Mar Food Truck 385669251635735
    // Rapadura Food Truck 1509473082664327
    //  General Chicken 392524240927564

    $scope.fanpages = [
      {id:"244576275632539",posts:[]},
      {id:"1491757611043874",posts:[]},
      {id:"243727072484890",posts:[]},
      {id:"263020680391340",posts:[]},
      {id:"1709247265967710",posts:[]},
      {id:"1511651809096678",posts:[]},
      {id:"385669251635735",posts:[]},
      {id:"1509473082664327",posts:[]},
      {id:"392524240927564",posts:[]}
    ]

    $scope.posts = {
      grids:[
        { objects:[], likes:0 },{objects:[], likes:0},{ objects:[], likes:0 }
      ]
    }

    $scope.isModalEnable = false
    $scope.isMapPromoVisible = true
    $scope.limit = 2

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

    // GET Locations for Trucks
    Foodtroopers.Truck.getAll(null, function(json){
      $scope.trucks = json
    })

    var count = 0
    var minLikes = 2

    Preloader.initializer(function() {
      $scope.loaded = true
      angular.forEach($scope.maps,function(instance,index){
        Foodtroopers.Maps.setMarkers(instance.map)
        Foodtroopers.Maps.resize(instance.map,600) // (map,timeout)
      })
    })


    // Requisitando últimas postagens
    angular.forEach($scope.fanpages,function(fanpage,index,_array){
      Facebook.Fanpage.getPostsFanPage(fanpage.id,15,function(result, status, headers, config) {
        angular.forEach(result.data,function(post,index,_array){
          Facebook.Post.getImageFromPost(post.object_id,function(object, status, headers, config){
            // Populando e Randomizando a View
            try{
              if(object.images != undefined && object.likes.data.length > minLikes)
                $scope.posts.grids[count].objects.push(object)
                count == 2 ? count = 0 : count++
                if(!$scope.$$phase) {
                  $scope.$apply() //update view
                }
            } catch(e){
              // none
            }
          });

          if(index == (_array.length - 1)){
            angular.forEach($scope.posts.grids,function(grid,index){
              $scope.posts.grids[index].objects = shuffle(grid.objects)
            })
          }

        });
      });
    });

    uiGmapGoogleMapApi.then(function(maps) {
      Foodtroopers.Maps.getUserLocation(function(position){
        $scope.map.center = position.coords
        angular.forEach($scope.trucks, function(truck,index){
          if(truck.geolocation != null)
            $scope.map.places.push({
              idKey:index,
              latitude:truck.geolocation.latitude,
              longitude:truck.geolocation.longitude,
              title:truck.name
            })
        })
      },function(){
        $scope.map.center =  $window.trucks[0].geolocation,
        angular.forEach($window.trucks, function(truck,index){
          if(truck.geolocation != null)
            $scope.map.places.push({
              idKey:index,
              coords:truck.geolocation,
              title:truck.name
            })
        })
      });
    });

    // Resize Maps
    uiGmapIsReady.promise(1).then(function(instances) {
      $scope.maps = instances
    });

    // Embaralhando Array
    function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }

  })

  .directive("onScroll",function($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var raw = element[0]
        element.bind("scroll", function() {
            if(raw.scrollTop + raw.offsetHeight >= raw.scrollHeight)
              scope.limit++
              scope.$apply();
        });
      }
    };
  })
