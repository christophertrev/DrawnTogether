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
.controller('stats', function ($scope, $document, canvasFuncs, paperFac, gameMech, $interval){
  var path;
  // { red: 0.96558, green: 0.96558, blue: 0.96558 }
  $scope.score = 0; 
  $scope.baseColor= '...Calculating Score'
  $scope.finalScore='...finalScore!'
  console.log(paperFac);
  angular.extend($scope,canvasFuncs)
  angular.extend($scope,gameMech)
  var socket = io();
  var pathother;
  socket.on('start',function(loc){
    paper = paperFac.notMyPaper;
    pathother = new paper.Path();
    pathother.strokeColor = 'red';
    pathother.strokeWidth = 10;
    pathother.add(new paper.Point(new paper.Point(loc[1],loc[2])));
    paper.view.draw()
    paper = paperFac.myPaper;
  })
  socket.on('drag',function(loc){
    paper = paperFac.notMyPaper;
    pathother.add(new paper.Point(new paper.Point(loc[1],loc[2])));
    pathother.smooth();
    paper.view.draw()
    paper = paperFac.myPaper;
  })
  function initPaper() {
    paper = paperFac.myPaper;
  }
  $scope.startGame = function (){
    console.log('starting game');
    $scope.timer =  30; 
    var intID = $interval(function (){
      $scope.startDrawing()
      $scope.timer--;
      console.log($scope.timer);
      if($scope.timer === 0 ){
        $interval.cancel(intID);
        $scope.deactivate();
      }
    },100); 
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
      $scope.fillcolor = raster.getAverageColor(event.point);
      $scope.finalScore = raster.getAverageColor().toString()
      $scope.$apply();
    }
    var tool = new paper.Tool();
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
      var socket = io();
      socket.emit('pointer',event.point)
      path.add(new paper.Point(event.point));
      path.smooth();
    }
  };

  obj.mouseDown = function(event) {
    drag = true;
    var socket = io();
    socket.emit('start',event.point)
    path = new paper.Path();
    path.strokeColor = 'blue';
    path.strokeWidth = 10;
    path.add(new paper.Point(event.point));
  };

  // obj.startDrawing = function (){
  //   console.log('drawTime!')
  //   var tool = new paper.Tool(); 
  //   tool.onMouseDown = obj.mouseDown;
  //   tool.onMouseDrag = obj.mouseDrag;
  //   tool.onMouseup = obj.mouseUp;
  //   tool.activate(); 
  // };

  return obj;
})
.factory('paperFac',function (){
  var papers = {};
  papers.myPaper = new paper.PaperScope();
  papers.notMyPaper = new paper.PaperScope();

  papers.myPaper.setup('myCanvas');

  paper = papers.notMyPaper;
  paper.setup('notMyCanvas');
  paper = papers.myPaper;
  var r = new paper.Raster('cat')
  r.position = paper.view.center;
  r.on('load',function(){
    r.size = new paper.Size(500,300)
  })
  return papers;

})
.factory('gameMech',function ($interval, canvasFuncs){
  var obj = {};
  obj.startGame = function (){
    console.log('starting game');
    obj.time = {timer: 30}; 
    $interval(function (){
      obj.time.timer--;
      console.log(obj.time);

    },100); 

  };

  obj.startDrawing = function (){
    console.log('drawTime!')
    var tool = new paper.Tool(); 
    tool.onMouseDown = canvasFuncs.mouseDown;
    tool.onMouseDrag = canvasFuncs.mouseDrag;
    tool.onMouseup = canvasFuncs.mouseUp;
    tool.activate(); 
  };

  obj.deactivate =function (){
    console.log('deactivating!')
    var tool = new paper.Tool();
    tool.activate();
  };

  obj.inspect = function (){
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
      $scope.fillcolor = raster.getAverageColor(event.point);
      $scope.finalScore = raster.getAverageColor().toString()
      $scope.$apply();
    }
    var tool = new paper.Tool();
    tool.onMouseMove = onMouseMove;
    tool.activate();
  };

  return obj
})