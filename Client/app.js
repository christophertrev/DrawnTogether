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
  function mouseUp(event) {
      drag = false;
  }

  function mouseDrag(event) {
    if (drag) {
        path.add(new paper.Point(event.point));
        path.smooth();
    }
  }

  function mouseDown(event) {
    drag = true;
    path = new paper.Path();
    path.strokeColor = 'black';
    path.strokeWidth = 10;
    path.add(new paper.Point(event.point));
  }

  function initPaper() {
    paper.install(window);
    paper.setup('myCanvas');
    r = new paper.Rectangle(new Point(0,0),paper.view.size)
    rect = new paper.Path.Rectangle(r)
    rect.fillColor='red'
  }

  $scope.deactivate =function (){
    console.log('deactivating!')
    var tool = new Tool();
    tool.activate();
  };
  $scope.inspect = function (){
    console.log('inspecting!')
     var raster = project.activeLayer.rasterize()
    var path = new paper.Path.Circle({
    center: [50, 50],
    radius: 30,
    strokeColor: 'white'
    });
    
    paper.view.draw();

    function onMouseMove(event) {
      console.log(raster.getAverageColor(event.point))
      path.fillColor = raster.getAverageColor(event.point);
    }
    var tool = new Tool();
    tool.onMouseMove = onMouseMove;
    tool.activate();
  };

  initPaper();
  var tool = new Tool(); 
  tool.onMouseDown = mouseDown;
  tool.onMouseDrag = mouseDrag;
  tool.onMouseup = mouseUp;
  tool.activate();
})
