var express = require("express")
var app = express()
var cors = require('cors')
var db = require("./database.js")
var session = require('express-session');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var path = require('path');


app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
const session_Status = (req, res, next) =>{
    if (!req.session.userId){
        res.send('Login to see this page!')
    }else{
        next()
    }
}
//var HTTP_PORT = 3000
const {
    HTTP_PORT = 3000
} = process.env

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/quiz", (req, res, next) => {
    var sql = "select * from quiz"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "quiz":rows
        })
      });
});
app.get("/api/mattequiz", (req, res, next) => {
    var sql = "select * from mattequiz"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "mattequiz":rows
        })
    });
});
/* Get Users */
app.get("/api/users", (req, res, next) => {
    const sql = "select * from users";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "users":rows
        })
    });
});

app.get("/api/quiz/:id", (req, res, next) => {
    var sql = "select * from quiz where quizId = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "quiz":row
        })
      });
});

app.get("/api/mattequiz/:id", (req, res, next) => {
    var sql = "select * from mattequiz where quizId = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "mattequiz":row
        })
    });
});

app.post("/api/quiz/", (req, res, next) => {
    var errors=[]
    if (!req.body.quizCorrectAnswer){
        errors.push("Inget korrekt svar angivet!");
    }
    var data = {
        quizQuestion: req.body.quizQuestion,
        quizAnswer1: req.body.quizAnswer1,
        quizAnswer2: req.body.quizAnswer2,
        quizAnswer3: req.body.quizAnswer3,
        quizCorrectAnswer: req.body.quizCorrectAnswer,
        quizImg: req.body.quizImg
    }
    var sql ='INSERT INTO quiz (quizQuestion, quizAnswer1, quizAnswer2, quizAnswer3, quizCorrectAnswer, quizImg) VALUES (?,?,?,?,?,?)'
    var params =[data.quizQuestion, data.quizAnswer1, data.quizAnswer2, data.quizAnswer3,data.quizCorrectAnswer,data.quizImg]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "quiz": data,
            "id" : this.lastID
        })
    });
})

app.put("/api/quiz/:id", (req, res, next) => {
    var data = {
        quizQuestion: req.body.quizQuestion,
        quizAnswer1: req.body.quizAnswer1,
        quizAnswer2: req.body.quizAnswer2,
        quizAnswer3: req.body.quizAnswer3,
        quizCorrectAnswer: req.body.quizCorrectAnswer,
        quizImg: req.body.quizImg
    }
    var sql ='UPDATE quiz SET quizQuestion = ?, quizAnswer1 = ?, quizAnswer2 = ?, quizAnswer3 = ?, quizCorrectAnswer = ?, quizImg = ? WHERE quizId = ?'
    var params =[data.quizQuestion, data.quizAnswer1, data.quizAnswer2, data.quizAnswer3,data.quizCorrectAnswer,data.quizImg, req.params.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "quiz": data,
            "id" : this.lastID
        })
    });
})

app.delete("/api/quiz/:id", (req, res, next) => {
    db.run(
        'DELETE FROM quiz WHERE quizId = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})



/* Users Handling */
app.get('/api/users', session_Status, (req, res, next) => {
    const sql = "select * from users";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "users":rows
        })
    });
})
app.get('/api/users/:id', session_Status, (request, response, next) => {
    const sql = 'select * from users where userId = ?'
    const params = [request.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
             response.status(400).json({"error":err.message});
            return;
        }
            response.json({
                "message":"success",
                "user":row
            })

    });
})
app.post('/api/fields', (request, response, next) => {
    const userData = {
        userRole: request.body.userRole,
        fullName: request.body.fullName,
        email: request.body.email,
        password1: request.body.password1,
        password2: request.body.password2,
    }
    if (userData.userRole &&userData.fullName &&  userData.email && userData.password1 && userData.password2 ) {
                response.send({
                    isFilled: true,
                });

    }else {
            response.send({
                isFilled: false,
                message: `Fields (*) are required!`
            });
    }
    response.end();
})
app.post('/api/email', (request, response, next) => {
    const userData = {
        email: request.body.email,
    }
        db.get('SELECT * FROM users WHERE email = ?', [userData.email], function (error, row) {
            if (row) {
                response.send({
                    isValid: false,
                    message: `This email is already exist!`
                });
            } else {
                response.send({
                    isValid: true,
                    message: `This email is valid!`
                });
            }
            response.end();
        });
})
app.post('/api/passwords', (request, response, next) => {
    const userData = {
        password1: request.body.password1,
        password2: request.body.password2,
    }
            if (userData.password1 !== userData.password2 ) {
                response.send({
                    isIdentical: false,
                    message: `Your passwords are not identical!`
                });
            } else {
                response.send({
                    isIdentical: true,
                    message: `Your passwords are identical!`
                });
            }
            response.end();
})
app.post('/api/users/', (req, res, next) => {
    const userData = {
        userRole: req.body.userRole,
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password2,
        phoneNumber: req.body.phoneNumber,
        schoolLevel: req.body.schoolLevel,
    }
            const sql = 'INSERT INTO users (userRole, fullName, email, password, phoneNumber, schoolLevel) VALUES (?,?,?,?,?,?)';
            const params = [userData.userRole, userData.fullName, userData.email, userData.password, userData.phoneNumber, userData.schoolLevel];
            db.run(sql, params, function (err, result) {
                if (err) {
                    res.status(400).json({ "error": err.message })
                    return;
                }
                res.json({
                    "message": "Success",
                    "users": userData,
                    "id": this.lastID
                })
            });
})
app.put('/api/users/:id', session_Status, (request, response, next) => {
    const userData = {
        userRole: request.body.userRole,
        fullName: request.body.fullName,
        email: request.body.email,
        password: request.body.password,
        phoneNumber: request.body.phoneNumber,
        schoolLevel: request.body.schoolLevel,
    }
    var sql ='UPDATE users SET userRole = ?, fullName = ?, email = ?, password = ?, phoneNumber = ?, schoolLevel = ? WHERE userId = ?'
    const params = [userData.userRole, userData.fullName, userData.email, userData.password, userData.phoneNumber, userData.schoolLevel , request.params.id];
    db.run(sql, params, function (err, result) {
        if (err){
            response.status(400).json({"error": err.message})
            return;
        }
        response.json({
            "message": "success",
            "user": userData,
            "id" : this.lastID
        })
    });
})
app.delete('/api/users/:id', session_Status, (request, response, next) => {
    db.run(
      'DELETE FROM users WHERE userId = ?',
      request.params.id,
      function (err, result) {
          if (err){
              response.status(400).json({
                  "error": response.message
              })
              return;
          }
          response.json({
              "message":"deleted",
              rows: this.changes
          })
      });
})
function hashPassword(password, salt) {
    const hash = crypto.createHash('sha256')
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
}
app.post('/api/auth', function(request, response) {
    const userData = {
        email: request.body.email,
        password: request.body.password,
    }
    if (userData.email && userData.password) {
            db.get('SELECT * FROM users WHERE email = ? AND password = ?', [userData.email, userData.password], function(error, row) {
                 if (row) {
                request.session.loggedin = true;
                request.session.userId = row.userId;
                request.session.username = row.fullName;
                request.session.userRole = row.userRole;
                response.send({
                    message:`Welcome: ${request.session.username} , You are: ${request.session.userRole}`
                });
            } else {
                response.send({
                    message: `Incorrect Username and/or Password!`
                });
            }
            response.end();
        });
    } else {
        response.send({
            message: `Please enter Username and Password!`
        });
        response.end();
    }
});
app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send(`<h3>Welcome back: ` + request.session.username +`</h3><form method="post" action="/logout"><button>Logout</button></form>
            <p>Your in home Page</p>
            <p>Your are connected as : `+request.session.role+`</p>`);
    } else {
        response.send('<h3>Your are in home page, Please login to view this page!</h3>');
    }
    response.end();
});
app.post('/logout', session_Status,  (req, res) => {
            req.session.destroy(err => {
                if (err) {
                    return res.redirect('/home')
                }
                res.send('<h3>Goodbye!</h3>');
            })
})

// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

