'use strict';

/**
 * @ngdoc function
 * @name foodtrackwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foodtrackwebApp
 */
angular.module('foodtrackwebApp')
  .controller('MainCtrl', function ($scope,Facebook) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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

    var count = 0
    var minLikes = 2

    // Requisitando últimas postagens
    angular.forEach($scope.fanpages,function(fanpage,index,_array){
      Facebook.getPostsFanPage(fanpage.id,15,function(result, status, headers, config) {
        angular.forEach(result.data,function(post,index,_array){
          Facebook.getImageFromPost(post.object_id,function(object, status, headers, config){
            // Populando e Randomizando a View
            if(object.images != undefined && object.likes.data.length > minLikes)
              $scope.posts.grids[count].objects.push(object)
              count == 2 ? count = 0 : count++
              if(!$scope.$$phase) {
                $scope.$apply() //update view
              }
              if(index == (_array.length - 1)){
                angular.forEach($scope.posts.grids,function(grid,index){
                  $scope.posts.grids[index] = shuffle(grid)
                })
              }
          });
        });
      });
    });

    // Embaralhando Array
    function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }

  });
