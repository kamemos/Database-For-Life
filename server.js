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
var db = mysql.createConnection(require('./configs/dbconfig.js'));
db.connect(function(err) {
    if (err) console.log("err");
    else console.log("Connected!");
});
// End Setup Database

// Routing
app.get('/', function(req, res, next){
    res.render('index',{msg:req.query.err});
});

app.post('/login', function(req,res,next){
    if (!req.body.username || !req.body.password){
        res.redirect('/?err=No username or password');
    }
    let user = null;
    db.query("SELECT * FROM student WHERE Sid="+req.body.username,function (err, result, fields){
        console.log(result[0].Spassword);
        if (result && req.body.password === result[0].Spassword){
            user = result;
            user.isAuthenticated = true;
            req.session.user = user[0];
            res.redirect('/menu')
        }
        else {
            res.redirect('/?err=Username or Password is not correct');
        }
    });
});

app.get('/logout', function(req,res,next){
    req.session.destroy();
    res.redirect('/')
})

app.get('/menu',isLoggedIn, function(req,res,next){
    console.log(req.session)
    res.render('menu');
});
// End Routing

// Set up middleware to check for login
function isLoggedIn(req, res, next) {
    if (req.session.user) {
      return next();
    }
    res.redirect("/");
}


// Create server
var insecureServer = http.createServer(app).listen(5555, function() {
    console.log('DB PROJECT - HTTP on ' + insecureServer.address().port);
})