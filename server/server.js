var express = require('express');
var morgan = require('morgan')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000))

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../Client'));

io.on('connection',function (socket){
  socket.on('pointer',function(loc){
    // console.log('locaation ', loc);
    socket.broadcast.emit('drag', loc);
  });
  socket.on('start',function(loc){
    console.log('start: ',loc)
    socket.broadcast.emit('start', loc)
  })
  socket.on('ready!',function (loc) {
     socket.broadcast.emit('oppReady!', loc);
  })
})





module.exports = function(){
  http.listen(app.get('port'), function(){
    console.log('listening on ', app.get('port'));
  });  
};
// app.listen(3000);