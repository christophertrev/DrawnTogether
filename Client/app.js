angular.module('ct-draw',[
  'ui.router',
  ])
// .config(function ($stateProvider, $urlRouterProvider) {
//   $urlRouterProvider.otherwise('/signup');
//     $stateProvider
//       .state('stats',{
//         url: '/stats',
//         templateUrl:
//         controller:
//       })
// })
.controller('stats', function ($scope){
  $scope.color = '(red, blue, green)';
})