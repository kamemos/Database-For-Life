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

app.get('/registersubj',isLoggedIn, function(req,res,next){
    //console.log(req.session.user)
    res.render('registersubj');
});

app.post('/registersubj',isLoggedIn, function(req,res,next){
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

var subjCode1 = null;
var subjCode2 = null;
var subjCode3 = null;
var subjCode4 = null;
var subjCode5 = null;
var subjCode6 = null;
var subjCode7 = null;
var subjCode8 = null;
var subjCode9 = null;
var secNo1 = null;
var secNo2 = null;
var secNo3 = null;
var secNo4 = null;
var secNo5 = null;
var secNo6 = null;
var secNo7 = null;
var secNo8 = null;
var secNo9 = null;
var subjName1 = null;
var subjName2 = null;
var subjName3 = null;
var subjName4 = null;
var subjName5 = null;
var subjName6 = null;
var subjName7 = null;
var subjName8 = null;
var subjName9 = null;

app.get('/addsubject',isLoggedIn, function(req,res,next){
    //console.log(req.session.user)
    res.render('addsubject');
});

app.post('/addsubject',isLoggedIn, function(req,res,next){
    subjCode1 = req.body.subjCode1;
    subjCode2 = req.body.subjCode2;
    subjCode3 = req.body.subjCode3;
    subjCode4 = req.body.subjCode4;
    subjCode5 = req.body.subjCode5;
    subjCode6 = req.body.subjCode6;
    subjCode7 = req.body.subjCode7;
    subjCode8 = req.body.subjCode8;
    subjCode9 = req.body.subjCode9;
    secNo1 = req.body.secNo1;
    secNo2 = req.body.secNo2;
    secNo3 = req.body.secNo3;
    secNo4 = req.body.secNo4;
    secNo5 = req.body.secNo5;
    secNo6 = req.body.secNo6;
    secNo7 = req.body.secNo7;
    secNo8 = req.body.secNo8;
    secNo9 = req.body.secNo9;
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
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo2 + ',"' + subjCode2 + '","' + Sgrade + '","' + State + '");',function(err,result){
            if(err) console.log("insert to database error");
            else console.log("insert to database successful");
    });
    db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo3 + ',"' + subjCode3 + '","' + Sgrade + '","' + State + '");',function(err,result){
            if(err) console.log("insert to database error");
            else console.log("insert to database successful");
    });
    db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo4 + ',"' + subjCode4 + '","' + Sgrade + '","' + State + '");',function(err,result){
            if(err) console.log("insert to database error");
            else console.log("insert to database successful");
    });
    db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo5 + ',"' + subjCode5 + '","' + Sgrade + '","' + State + '");',function(err,result){
            if(err) console.log("insert to database error");
            else console.log("insert to database successful");
    });
    db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo6 + ',"' + subjCode6 + '","' + Sgrade + '","' + State + '");',function(err,result){
            if(err) console.log("insert to database error");
            else console.log("insert to database successful");
    });
    db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo7 + ',"' + subjCode7 + '","' + Sgrade + '","' + State + '");',function(err,result){
            if(err) console.log("insert to database error");
            else console.log("insert to database successful");
    });
    db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo8 + ',"' + subjCode8 + '","' + Sgrade + '","' + State + '");',function(err,result){
            if(err) console.log("insert to database error");
            else console.log("insert to database successful");
    });
    db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade, State) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo9 + ',"' + subjCode9 + '","' + Sgrade + '","' + State + '");',function(err,result){
            if(err) console.log("insert to database error");
            else console.log("insert to database successful");
    });
    if(subjCode1){
        console.log('yes subjCode1');
        db.query('SELECT Sname FROM Student_registers_in natural join Subjects WHERE Sid="' + Sid + '";', function(err,result){
                if(err) console.log("error query Sname");
                else if(result.length == 2 ){
                    console.log('length = 2');
                    subjName1 = result[0].Sname;
                    subjName2 = result[1].Sname;
                    res.redirect('/addsubject/showresult');
                }else if(result.length == 1){
                    console.log('length = 1');
                    subjName1 = result[0].Sname;
                    res.redirect('/addsubject/showresult');
                }else{
                    console.log('length > 2');
                    if(result[0]) subjName1 = result[0].Sname;
                    if(result[1]) subjName2 = result[1].Sname;
                    if(result[2]) subjName3 = result[2].Sname;
                    if(result[3]) subjName4 = result[3].Sname;
                    if(result[4]) subjName5 = result[4].Sname;
                    if(result[5]) subjName6 = result[5].Sname;
                    if(result[6]) subjName7 = result[6].Sname;
                    if(result[7]) subjName8 = result[7].Sname;
                    if(result[8]) subjName9 = result[8].Sname;
                    res.redirect('/addsubject/showresult');
                }
        });
    }
});


app.get('/addsubject/showresult',isLoggedIn, function(req,res,next){
    // console.log(req.flash());
    res.render('addsubresult', {
        sCode1: subjCode1,
        sCode2: subjCode2,
        sCode3: subjCode3,
        sCode4: subjCode4,
        sCode5: subjCode5,
        sCode6: subjCode6,
        sCode7: subjCode7,
        sCode8: subjCode8,
        sCode9: subjCode9,
        sName1: subjName1,
        sName2: subjName2,
        sName3: subjName3,
        sName4: subjName4,
        sName5: subjName5,
        sName6: subjName6,
        sName7: subjName7,
        sName8: subjName8,
        sName9: subjName9,
        sNo1: secNo1,
        sNo2: secNo2,
        sNo3: secNo3,
        sNo4: secNo4,
        sNo5: secNo5,
        sNo6: secNo6,
        sNo7: secNo7,
        sNo8: secNo8,
        sNo9: secNo9
    });
});

app.get('/removesubject',isLoggedIn, function(req, res, next){
    let msg = req.query.msg;
    let query = "Select * from Student_registers_in t1 \
                 LEFT JOIN  Subjects t2 On t1.Scode = t2.Scode \
                 Where Sgrade = 'R' \
                 and Sid = "+req.session.user.Sid;
    
    db.query(query,function(err,result){
        if (err){
            res.render('removesubject',{msg:msg});
        }
        else{
            console.log(result);
            res.render('removesubject',{msg:msg,
                                        subjects:result});
        }
    })
});

app.post('/removesubject',isLoggedIn, function(req,res,next){
    let subjectID = req.body.subjectID;
    let query = 'UPDATE Student_registers_in SET Sgrade = "R" \
                 WHERE Scode='+subjectID+' and \
                 Sid='+req.session.user.Sid+' and \
                 Sgrade="-"';
    db.query(query,function(err,result){
        if(err || result.affectedRows === 0){
            let msg = encodeURIComponent("Not available");
            res.redirect('/removesubject?msg='+msg);
        }
        else {
            let msg = encodeURIComponent("Available");
            res.redirect('/removesubject?msg='+msg);
        }
    });
})

app.get('/withdrawsubject',isLoggedIn, function(req, res, next){
    let msg = req.query.msg;
    let query = "Select * from Student_registers_in t1 \
                 LEFT JOIN  Subjects t2 On t1.Scode = t2.Scode \
                 Where Sgrade = 'WA' \
                 and Sid = "+req.session.user.Sid;
    
    db.query(query,function(err,result){
        if (err){
            res.render('withdrawsubject',{msg:msg});
        }
        else{
            console.log(result);
            res.render('withdrawsubject',{msg:msg,
                                          subjects:result});
        }
    })
});

app.post('/withdrawsubject',isLoggedIn, function(req,res,next){
    let subjectID = req.body.subjectID;
    let query = 'UPDATE Student_registers_in SET Sgrade = "WA" \
                 WHERE Scode='+subjectID+' and\
                 Sid='+req.session.user.Sid+' and\
                 Sgrade="-"';
    db.query(query,function(err,result){
        if(err || result.affectedRows === 0){
            let msg = encodeURIComponent("Not available");
            res.redirect('/withdrawsubject?msg='+msg);
        }
        else {
            let msg = encodeURIComponent("Available");
            res.redirect('/withdrawsubject?msg='+msg);
        }
    });
})

app.get('/findsubject',isLoggedIn, function(req, res, next){
    res.render('findsubject');
});

app.post('/findsubject',isLoggedIn, function(req, res, next){
    let msg = req.query.msg;
    let subjCode = req.body.subjCode;
    let subjName = req.body.subjName;
    let query = 'SELECT * FROM subjects S, section C WHERE S.Scode = C.Scode AND (S.Scode = '+(0+subjCode)+' OR S.Sname = "'+subjName+'" );';
    console.log(query);
    db.query(query,function(err,result){
        console.log(result);
        if (err){
            console.log('error jaa!');
            res.render('findsubject',{msg:msg});
        }
        else{
            console.log(result);
            res.render('findsubject',{msg:msg,
                                      subjects:result});
        }
    })
});

app.get("/transcript", isLoggedIn, function(req,res,next){
    db.query('select * from subjects inner join student_registers_in on student_registers_in.Scode = subjects.Scode && student_registers_in.Sid =' +req.session.user.Sid, function(err,result,fields){
        if(err) throw err;
        else{
            //setValue(result);
            data=result;
            console.log(data);
        }
        var test = [];
        test = data;
        var size = 0;
        console.log(size);
        res.render("transcript", {Sname: req.session.user.Sname,
                                Sid: req.session.user.Sid,
                                Faculty: req.session.user.Faculty,
                                State: req.session.user.State,
                                Grade: req.session.user.Grade,
                                Educational_level: req.session.user.Educational_level,
                                Group_name: req.session.user.Group_name,
                                Ncourse: req.session.user.Ncourse,
                                program: req.session.user.Nfaculty,
                                out: test
                                });
        console.log(req.session);
    });
});

app.get('/payment',isLoggedIn,function(req,res){
    let query = "SELECT * FROM Term_payment \
                WHERE Sid = " + req.session.user.Sid;
    db.query(query,function(err,result){
        console.log(result);
        res.render('payment',{user:req.session.user,
                              payments:result});
    });
});

app.get('/studentinfo',isLoggedIn, function(req, res, next){
    db.query('SELECT * FROM student S, activity_participation A WHERE A.Sid = S.Sid && S.Sid =' +req.session.user.Sid, function(err,result,fields){
        if(err) throw err;
        else console.log(result);
        res.render("studentinfo", {Sname: req.session.user.Sname,
                                Sid: req.session.user.Sid,
                                Faculty: req.session.user.Faculty,
                                Educational_level: req.session.user.Educational_level,
                                Group_name: req.session.user.Group_name,
                                Cdept_name: req.session.user.Cdept_name,
                                result: result
                                });
        console.log(req.session);
    });
});

app.get('/findactivity',isLoggedIn, function(req, res, next){
    res.render('findactivity');
});

app.post('/findactivity',isLoggedIn, function(req, res, next){
    let msg = req.query.msg;
    let actName = req.body.actName;
    let actYear = req.body.actYear;
    let query = 'SELECT * FROM activity A, held_at H WHERE A.Aname = H.Aname AND (A.Aname = "'+actName+'" OR A.Ayear = "'+(0+actYear)+'" )';
    console.log(query);
    db.query(query,function(err,result){
        console.log(result);
        if (err){
            console.log('error jaa!');
            res.render('findactivity',{msg:msg});
        }
        else{
            console.log(result);
            res.render('findactivity',{msg:msg,
                                          result:result});
        }
    })
});

app.get('/findstudent',isLoggedIn, function(req, res, next){
    res.render('findstudent');
});

app.post('/findstudent',isLoggedIn, function(req, res, next){
    let SID = req.body.SID;
    let query = 'SELECT * FROM student S, activity_participation A WHERE A.Sid = S.Sid && S.Sid = '+SID+' LIMIT 1';
    console.log(query);
    db.query(query,function(err,result){

        if (err){
            console.log('error jaa!');
            res.render('findstudent');
        }
        else{
            console.log(result);
            res.render('findstudent',{result:result});
        }
    })
});

app.get('/vishnu/menu',function(req,res){
    res.render('vishnumenu');
})
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