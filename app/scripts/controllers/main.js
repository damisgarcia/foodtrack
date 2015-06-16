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
    // FoodTruckNasRuas:"232223216969714"

    $scope.fanpages = [
      {id:"244576275632539",posts:[]},
      {id:"1491757611043874",posts:[]}
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
      Facebook.getPostsFanPage(fanpage.id,50,function(result, status, headers, config) {
        angular.forEach(result.data,function(post,index,_array){
          Facebook.getImageFromPost(post.object_id,function(object, status, headers, config){
            // Populando e Randomizando a View
            if(object.images != undefined && object.likes.data.length > minLikes)
              $scope.posts.grids[count].objects.push(object)
              count == 2 ? count = 0 : count++
              $scope.$apply() //update view
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
