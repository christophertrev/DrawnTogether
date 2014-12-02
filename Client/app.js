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
  // { red: 0.96558, green: 0.96558, blue: 0.96558 }
  $scope.score = 0; 
  $scope.baseColor= '...Calculating Score'
  $scope.finalScore='...finalScore!'
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
    path.strokeWidth = 5;
    path.add(new paper.Point(event.point));
  }

  function initPaper() {
    paper.install(window);
    paper.setup('myCanvas');
    var r = new Raster('cat')
    
    r.position = view.center;
    r.on('load',function(){
      
    r.size = new Size(300,200)
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
  function getScore(){

  }

  initPaper();
  var tool = new Tool(); 
  tool.onMouseDown = mouseDown;
  tool.onMouseDrag = mouseDrag;
  tool.onMouseup = mouseUp;
  tool.activate();
})
