// Dependencies
var express = require('express');
var https = require('https');
var http = require('http');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var mysql = require('mysql');
var app = express();
// End Dependencies

// Middleware
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } //1hour
}));
app.use(flash());

// End Middleware

// Setup Database
var db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: ""
});
db.connect(function(err) {
    if (err) console.log("err");
    else console.log("Connected!");
});
// End Setup Database

// Routing
app.get('/', function(req, res, next) {
    res.render('index');
});
// End Routing

// Create server
var insecureServer = http.createServer(app).listen(5555, function() {
    console.log('DB PROJECT - HTTP on ' + insecureServer.address().port);
})