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
.controller('stats', function ($scope, $document){
// var path;
//     var drag = false;

//     $scope.mouseUp = function(){
//         //Clear Mouse Drag Flag
//         drag = false;
//     };

//     $scope.mouseDrag = function(event){
//         if(drag){
//             path.add(new paper.Point(event.x, event.y));
//             path.smooth();
//         }
//     };

//     $scope.mouseDown = function(event){
//         //Set  flag to detect mouse drag
//         drag = true;
//         path = new paper.Path();
//         path.strokeColor = 'black';
//         path.add(new paper.Point(event.x, event.y));
//     };

//     init();
//     function init(){
//         paper.install(window);
//         paper.setup('myCanvas');          
//     }
})
.directive('draw', function () {
    return {
        restrict: 'E',
        scope: {

        },
        template: '<canvas id="myCanvas" ></canvas>',
        replace: true,
        link: function postLink(scope, element, attrs) {
            var path;
            var drag = false;

            function mouseUp(event) {
                //Clear Mouse Drag Flag
                drag = false;

            }

            function mouseDrag(event) {
                if (drag) {
                    path.add(new paper.Point(event.layerX, event.layerY));
                    path.smooth();
                }
            }

            function mouseDown(event) {
                //Set  flag to detect mouse drag
                drag = true;
                path = new paper.Path();
                path.strokeColor = 'black';
                path.add(new paper.Point(event.layerX, event.layerY));
            }

            function initPaper() {
                paper.install(window);
                paper.setup('myCanvas');
            }

            element.on('mousedown', mouseDown).on('mouseup', mouseUp).on('mousemove', mouseDrag);

            initPaper();

        }
    };
});

