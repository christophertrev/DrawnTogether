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
            var path;
            var drag = false;
            // console.log('scope',scope)
            function mouseUp(event) {
                //Clear Mouse Drag Flag
                drag = false;

            }

            function mouseDrag(event) {
                if (drag) {
                    path.add(new paper.Point(event.point));
                    path.smooth();
                }
            }

            function mouseDown(event) {
                //Set  flag to detect mouse drag
                drag = true;
                path = new paper.Path();
                path.strokeColor = 'black';
                path.strokeWidth = 10;
                // path.add(new paper.Point(event.layerX, event.layerY));
                path.add(new paper.Point(event.point));
            }

            function initPaper() {
                paper.install(window);
                paper.setup('myCanvas');


            }

            // element.on('mousedown', mouseDown).on('mouseup', mouseUp).on('mousemove', mouseDrag);
            initPaper();
            var tool = new Tool(); 
            tool.onMouseDown = mouseDown;
            tool.onMouseDrag = mouseDrag;
            tool.onMouseup = mouseUp;
            tool.activate();
})
