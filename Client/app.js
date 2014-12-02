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
.controller('stats', function ($scope, $document, canvasFuncs){
  var path;
  // { red: 0.96558, green: 0.96558, blue: 0.96558 }
  $scope.score = 0; 
  $scope.baseColor= '...Calculating Score'
  $scope.finalScore='...finalScore!'
  angular.extend($scope,canvasFuncs)
  function initPaper() {
    paper.install(window);
    paper.setup('myCanvas');
    var r = new Raster('cat')
    r.position = view.center;
    r.on('load',function(){
      r.size = new Size(600,400)
      $scope.baseColor = r.getAverageColor().toString()
      $scope.$apply()
    })
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
      console.log(raster.getAverageColor().toString())
      path.fillColor = raster.getAverageColor(event.point);
      $scope.finalScore = raster.getAverageColor().toString()
      $scope.$apply();
    }
    var tool = new Tool();
    tool.onMouseMove = onMouseMove;
    tool.activate();
  };

  initPaper();
})
.factory('canvasFuncs', function(){
  var obj = {};
  var drag = false;
  obj.mouseUp = function (event) {
      drag = false;
  };

  obj.mouseDrag = function (event) {
    if (drag) {
      // add web socket here to send event 
        path.add(new paper.Point(event.point));
        path.smooth();
    }
  };

  obj.mouseDown = function(event) {
    drag = true;
    path = new paper.Path();
    path.strokeColor = 'black';
    path.strokeWidth = 10;
    path.add(new paper.Point(event.point));
  };

  obj.startDrawing = function (){
    console.log('drawTime!')
    var tool = new Tool(); 
    tool.onMouseDown = obj.mouseDown;
    tool.onMouseDrag = obj.mouseDrag;
    tool.onMouseup = obj.mouseUp;
    tool.activate(); 
  };

  return obj;
})