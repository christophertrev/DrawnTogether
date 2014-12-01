window.onload = function () {
  paper.setup('myCanvas');
  var p = paper;
  var tool = new p.Tool();
  console.log( p.view)
  // path = new p.Path();
  // path.strokeColor = 'black';
  tool.onMouseDown= function (event) {
      path = new p.Path();
      path.strokeColor = 'black';
      path.add(event.point);
    }
  tool.onMouseDrag = function(event) {
    // Use the arcTo command to draw cloudy lines
    path.arcTo(event.point);
  }
  tool.activate();
}