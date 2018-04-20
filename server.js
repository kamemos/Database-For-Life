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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// End Middleware

// Setup Database
var db = mysql.createConnection(require('./configs/dbconfig.js'));
db.connect(function(err) {
    if (err) console.log("err connect database");
    else console.log("connect database success");
});
// End Setup Database

// Routing
app.get('/', function(req, res, next){
    res.render('index',{msg:req.query.err});
});

app.post('/login', function(req,res,next){

    if (!req.body.username || !req.body.password){
        return res.redirect('/?err=No username or password');
    }
    let user = null;
    db.query("SELECT * FROM student WHERE Sid="+req.body.username,function (err, result, fields){
        if (result && req.body.password === result[0].Spassword){
            user = result;
            user.isAuthenticated = true;
            req.session.user = user[0];
            res.redirect('/menu');
        }
        else {
            res.redirect('/?err=Username or Password is not correct');
        }
    });
});

app.get('/logout', function(req,res,next){
    req.session.destroy();
    res.redirect('/');
})

app.get('/menu',isLoggedIn, function(req,res,next){
    console.log(req.session)
    res.render('menu');
});

<<<<<<< Updated upstream
app.get('/addsubject',isLoggedIn, function(req,res,next){
    //console.log(req.session.user)
    res.render('addsubject');
});

app.post('/addsubject',isLoggedIn, function(req,res,next){
	let subjCode1 = req.body.subjCode1;
	let subjCode2 = req.body.subjCode2;
	let secNo1 = req.body.secNo1;
	let secNo2 = req.body.secNo2;
	let Sid = req.session.user.Sid;
	let Syear = 2559;
	let Ssemester = 2;
	let Sgrade = "-1";
	let State = "S";
	console.log('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
		+ Sid + '",' + Syear + ',' + Ssemester + ',' + secNo1 + ',"' + subjCode1 + '","' + Sgrade + '","' + State + '");');
	db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
		+ Sid + '",' + Syear + ',' + Ssemester + ',' + secNo1 + ',"' + subjCode1 + '","' + Sgrade + '","' + State + '");',function(err,result){
			if(err) throw err;
			else console.log("insert to database successful");
	});
	db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
		+ Sid + '",' + Syear + ',' + Ssemester + ',' + secNo2 + ',"' + subjCode2 + '","' + Sgrade + '","' + State + '");',function(err,result,fields){
			if(err) console.log("insert to database error");
			else console.log("insert to database successful");
	});
	res.redirect('/menu');
});
=======
app.get('/showgrade',isLoggedIn, function(req, res, next){
    res.render('showgrade');
});

>>>>>>> Stashed changes
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