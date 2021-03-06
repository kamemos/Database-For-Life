// Dependencies
var express = require('express');
var https = require('https');
var http = require('http');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var mysql = require('mysql');
var app = express();
var moment = require('moment');
var date = require('date');
// var connection = mysql.createConnection({multipleStatements: true});
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
    let msg = '';
    console.log(msg.query)
    if (req.query.msg) msg = req.query.msg;
    res.render('menu',{msg:msg});
});

app.get('/registersubj',isLoggedIn, function(req,res,next){
    //console.log(req.session.user)
    res.render('registersubj');
});

var subjCode = [];
var secNo = [];
var subjName = [];

app.post('/registersubj',isLoggedIn, function(req,res,next){
    subjCode = req.body.subjCode;
    secNo = req.body.secNo;
    let Sid = req.session.user.Sid;
    let Syear = 2559;
    let Ssemester = 2;
    let Sgrade = "-";
    console.log('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo[0] + ',"' + subjCode[0] + '","' + Sgrade + '");');
    for(var i=0; i<7; i++){
        db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade) VALUES ("'
            + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo[i] + ',"' + subjCode[i] + '","' + Sgrade + '");',function(err,result){
                if(err){
                    console.log('insert to database error');
                }
                else console.log("insert to database successful");
        });
    }
    if(subjCode[0]){
        db.query('SELECT Sname FROM Student_registers_in natural join Subjects WHERE Sid="' + Sid + '";', function(err,result){
                if(err) console.log("error query Sname");
                else{
                    console.log('length > 1');
                    for(var i=0; i<7; i++){
                        if(result[i]) subjName[i] = result[i].Sname;
                    }
                    res.redirect('/registersubj/showresult');
                }
        });
    }
});

app.get('/registersubj/showresult',isLoggedIn, function(req,res,next){
    res.render('regsubresult', {
        sCode: subjCode,
        sName: subjName,
        sNo: secNo
    });
});

var subjCode = [];
var secNo = [];
var subjName = [];

app.get('/addsubject',isLoggedIn, function(req,res,next){
    //console.log(req.session.user)
    res.render('addsubject');
});

app.post('/addsubject',isLoggedIn, function(req,res,next){
    subjCode = req.body.subjCode;
    secNo = req.body.secNo;
    let Sid = req.session.user.Sid;
    let Syear = 2559;
    let Ssemester = 2;
    let Sgrade = "-";
    console.log('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade) VALUES ("'
        + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo[0] + ',"' + subjCode[0] + '","' + Sgrade + '");');
    for(var i=0; i<8; i++){
        db.query('INSERT INTO Student_registers_in (Sid, Syear, Ssemester, Ssection, Scode, Sgrade) VALUES ("'
            + Sid + '",' + Syear + ',' + Ssemester + ',' + secNo[i] + ',"' + subjCode[i] + '","' + Sgrade + '");',function(err,result){
                if(err){
                    console.log('insert to database error');
                }
                else console.log("insert to database successful");
        });
    }
    if(subjCode[0]){
        db.query('SELECT Sname FROM Student_registers_in natural join Subjects WHERE Sid="' + Sid + '";', function(err,result){
                if(err) console.log("error query Sname");
                else{
                    console.log('length > 1');
                    for(var i=0; i<8; i++){
                        if(result[i]) subjName[i] = result[i].Sname;
                    }
                    res.redirect('/addsubject/showresult');
                }
        });
    }
});


app.get('/addsubject/showresult',isLoggedIn, function(req,res,next){
    // console.log(req.flash());
    res.render('addsubresult', {
        sCode: subjCode,
        sName: subjName,
        sNo: secNo
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
            var dateParts = [];
            for(var i=0; i<result.length; i++){
                console.log(result[i].Hdate);
                dateParts[i] = result[i].Hdate;
                var date = new Date();
                date = moment(dateParts[i]).format('YYYY-MM-DD');
                result[i].Hdate = date;
            }
            console.log(date);
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

app.get('/vishnustudentreg', isLoggedIn, function(req, res, next){
    res.render('vishnustudentreg');
});

app.post('/vishnustudentreg', isLoggedIn, function(req, res, next){
    let query = "update student set Cdept_name = '" + req.body.affname + "', Cacad_year = " + req.body.affyear + " where Sid = '" + req.body.studentID + "';";
    console.log(query);
    db.query(query, function(err, result){
        if(err){
            res.render('vishnustudentreg', {error:"INPUT ERROR"});
        }
        else{
            res.render('vishnustudentreg', {success:"UPDATED SUCCESSFUL"});
        }
    });
});

app.get('/editstudentactivity',function(req,res){
    let query = 'SELECT * FROM activity A, held_at H WHERE A.Aname = H.Aname and A.Ayear = H.Ayear;';
    console.log(query);
    db.query(query,function(err,result){
        console.log(result);
        if (err){
            console.log('error jaa!');
            res.render('editstudentactivity');
        }
        else{
            var dateParts = [];
            for(var i=0; i<result.length; i++){
                console.log(result[i].Hdate);
                dateParts[i] = result[i].Hdate;
                var date = new Date();
                date = moment(dateParts[i]).format('YYYY-MM-DD');
                result[i].Hdate = date;
            }
            console.log(date);
            console.log(result);
            res.render('editstudentactivity',{result:result});
        }
    });
});

app.get('/activitystudentinfo/:activityname',function(req,res){
    let Aname = req.params.activityname;
    console.log(Aname);
    let query = 'SELECT Sid,Sname,Syear,Group_name FROM activity_participation AP natural join Student S WHERE AP.Aname = "' + Aname + '";';
    console.log(query);
    db.query(query, function(err,result){
        if(err){
            console.log('query from database error');
            res.render('activitystudentinfo', {Aname:Aname, result: null});
        }else{
            console.log('query from database successful');
            res.render('activitystudentinfo', {Aname:Aname, result:result});
        }
    });
});

app.get('/addnisitactivity/:activityname',isLoggedIn, function(req,res,next){
    let Aname = req.params.activityname;
    res.render('addnisitactivity', {Aname:Aname});
});

app.post('/addnisitactivity/:activityname',isLoggedIn, function(req,res,next){
    let Sid = req.body.Sid;
    let Ayear = req.body.Ayear;
    let Aname = req.params.activityname;
    let query = 'insert into activity_participation(Sid, Aname, Ayear) VALUES ("' + Sid + '", "' + Aname + '", ' + Ayear + ');';
    console.log(query);
    db.query(query, function(err,result){
        if(err){
                console.log('insert to database error');
        }else{
            console.log("insert to database successful");
            res.redirect('/activitystudentinfo/'+Aname);
        }
    })
});

app.get('/addactivity',isLoggedIn, function(req,res,next){
    res.render('addactivity');
});

app.post('/addactivity',isLoggedIn, function(req,res,next){
    Aname = req.body.Aname;
    Ayear = req.body.Ayear;
    Place = req.body.Place;
    date = req.body.Date;
    Btime = req.body.Btime;
    Etime = req.body.Etime;

    console.log('INSERT INTO activity (Aname, Ayear) VALUES ("' + Aname + '",' + Ayear + ');'+
    'INSERT INTO held_at (Pname, Aname, Ayear, Hdate, Begin_time, End_time) VALUES ("'
    + Place + '","' + Aname + '",' + Ayear + ",'" + date + "','" + Btime + "','" + Etime + "');");

    db.query('INSERT INTO activity (Aname, Ayear) VALUES ("' + Aname + '",' + Ayear + ');',function(err,result){
            if(err){
                console.log('insert to database error');
            }
            else console.log("insert to database successful");
    });

    db.query('INSERT INTO held_at (Pname, Aname, Ayear, Hdate, Begin_time, End_time) VALUES ("'
    + Place + '","' + Aname + '",' + Ayear + ",'" + date + "','" + Btime + "','" + Etime + "');",function(err,result){
        if(err){
            console.log('insert to database error');
            res.render('addactivity', {error:"INPUT ERROR"});
        }
        else {
            console.log("insert to database successful");
            res.render('addactivity', {success:"INSERT SUCCESSFUL"});
        }
    });
    
});

app.get('/vishnu/editnisit',isLoggedIn,function(req,res){
    let msg = '';
    let success = '';
    if (req.query.update == 'false') msg = "Update error"
    else if (req.query.update == 'true') success = 'Successfully update'
    res.render('vishnueditnisit',{msg:msg,success:success});
})

app.get('/vishnu/editnisit/show',isLoggedIn,function(req,res){
    let sid = req.session.editnisit.Sid;
    req.secure.editnisit = undefined;
    let query = "select * from student t1 \
                 inner join Central t2 on t1.Cdept_name = t2.dept_name and t1.Cacad_year = t2.acad_year\
                 where t1.Sid = "+sid
    db.query(query,function(err,results){
        if (err || !results){
            res.render('vishnueditnisit',{msg:"Not available"});
        }
        else {
            console.log(results)
            res.render('vishnueditnisit',{nisit:results[0]});
        }
    })
})

app.post('/vishnu/editnisit',isLoggedIn,function(req,res){
    req.session.editnisit = req.body
    res.redirect('/vishnu/editnisit/show');
})

app.post('/vishnu/editnisit/:Sid',isLoggedIn,function(req,res){
    req.session.editnisit = req.body
    let query1 = ""
    if (req.body.group && req.body.duty && req.body.duty_year){
        query1 = 'UPDATE Student SET Group_name = '+'"'+req.body.group+'"'+', \
                  Cdept_name ='+'"'+req.body.duty+'"'+',\
                  Cacad_year ='+req.body.duty_year+'\
                  WHERE Sid='+req.params.Sid
    }
    db.query(query1,function(err,result){
        if(err || result.affectedRows === 0){
            res.redirect('/vishnu/editnisit?update=false');
        }
        else {
            res.redirect('/vishnu/editnisit?update=true')
        }
    })
})

app.get('/vishnu/menu',isLoggedIn,isStaff,function(req,res){
    res.render('vishnumenu');
});
// End Routing

// Set up middleware to check for login
function isLoggedIn(req, res, next) {
    if (req.session.user) {
      return next();
    }
    res.redirect("/");
}

function isStaff(req, res, next) {
    if (req.session.user.Cdept_name === 'Nothing'){
        console.log('test',req.session)
        res.redirect('/menu/?msg=Permission denied')
    }
    return next();
}





// Create server
var insecureServer = http.createServer(app).listen(5555, function() {
    console.log('DB PROJECT - HTTP on ' + insecureServer.address().port);
})

