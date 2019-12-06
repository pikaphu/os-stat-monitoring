var express = require('express');
var app = express();

var dotenv = require('dotenv');
dotenv.config();

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Static Files Route
app.use(express.static('html'))
//app.use('/scripts/socketio', express.static(__dirname + '/node_modules/socket.io-client/dist/socket.io.dev.js'))
app.all('/socket.io/', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.dev.js')
})

var http = require('http')
var server = http.Server(app)

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(cookieParser())

// API Route
var users = require('./routes/users');
app.use('/api/v1/users', users);

require('./monitor.js')(server)

module.exports = {
    app,
    http,
    server
}