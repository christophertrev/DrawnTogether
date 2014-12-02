var express = require('express');
var morgan = require('morgan')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000))

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../Client'));

module.exports = function(){
  http.listen(app.get('port'), function(){
    console.log('listening on ', app.get('port'));
  });  
};
// app.listen(3000);