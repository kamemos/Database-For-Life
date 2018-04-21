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
    var subjName1 = null;
    var subjName2 = null;
    console.log('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo1 + ',"' + subjCode1 + '","' + Sgrade + '","' + State + '");');
    db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo1 + ',"' + subjCode1 + '","' + Sgrade + '","' + State + '");',function(err,result){
            if(err) throw err;
            else console.log("insert to database successful");
    });
    db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo2 + ',"' + subjCode2 + '","' + Sgrade + '","' + State + '");',function(err,result){
            if(err) console.log("insert to database error");
            else console.log("insert to database successful");
    });
    if(subjCode1){
        console.log('yes subjCode1');
        db.query('SELECT Sname FROM Student_registers_in natural join Subjects WHERE Sid="' + Sid + '";', function(err,result){
                if(err) console.log("error query Sname");
                else if(result.length > 1 ){
                    console.log('length > 1');
                    subjName1 = result[0].Sname;
                    subjName2 = result[1].Sname;
                    res.render('addsubresult', {
                        sCode1: subjCode1,
                        sCode2: subjCode2,
                        sName1: subjName1,
                        sName2: subjName2,
                        sNo1: secNo1,
                        sNo2: secNo2
                    });
                }else if(result.length == 1){
                    console.log('length = 1');
                    subjName1 = result[0].Sname;
                    res.render('addsubresult', {
                        sCode1: subjCode1,
                        sCode2: null,
                        sName1: subjName1,
                        sNo1: secNo1
                    });
                }
        });
    }
});


app.get('/addsubresult',isLoggedIn, function(req,res,next){
    // console.log(req.flash());
    res.render('addsubresult');
});

app.get('/showgrade',isLoggedIn, function(req, res, next){
    res.render('showgrade');
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