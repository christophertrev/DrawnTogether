var express = require('express');
var morgan = require('morgan')
var app = express();


app.use(morgan('dev'));
app.use(express.static(__dirname + '/../Client'));

module.exports = app;
// app.listen(3000);