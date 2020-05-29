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
    saveUninitialized: true,
}));
const session_Status = (request, response, next) =>{
    if (!request.session.loggedin) {
        response.send('Sorry! Login to see this page.')
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




/* Geography Quiz */
app.get("/api/geoQuiz", (req, res, next) => {
    var sql = "select * from geoQuiz"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "geoQuiz":rows
        })
      });
});
app.get("/api/geoQuiz/level", (req, res, next) => {
    var sql = "select * from geoQuiz";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "geoQuiz":rows
        })
    });
});
app.get("/api/geoQuiz/numberOfLevel", (req, res, next) => {
    const sql = 'select quizLevel from geoQuiz GROUP BY quizLevel';
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "geoQuizLevel":rows
        })
    });
});
app.get("/api/geoQuiz/level/:id", (req, res, next) => {
    var sql = "select * from geoQuiz where quizLevel = ?";
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "geoQuiz":rows
        })
    });
});
app.get("/api/geoQuiz/:id", (req, res, next) => {
    var sql = "select * from geoQuiz where quizId = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "geoQuiz":row
        })
      });
});
app.post("/api/geoQuiz/", (req, res, next) => {
    const data = {
        quizQuestion: req.body.quizQuestion,
        quizLevel: req.body.quizLevel,
        quizAnswer1: req.body.quizAnswer1,
        quizAnswer2: req.body.quizAnswer2,
        quizAnswer3: req.body.quizAnswer3,
        quizCorrectAnswer: req.body.quizCorrectAnswer,
        quizImg: req.body.quizImg
    }
    const sql = 'INSERT INTO geoQuiz (quizQuestion, quizLevel, quizAnswer1, quizAnswer2, quizAnswer3, quizCorrectAnswer, quizImg) VALUES (?,?,?,?,?,?,?)'
    const params = [data.quizQuestion, data.quizLevel, data.quizAnswer1, data.quizAnswer2, data.quizAnswer3, data.quizCorrectAnswer, data.quizImg]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "geoQuiz": data,
            "id" : this.lastID
        })
    });
})
app.put("/api/geoQuiz/:id", (req, res, next) => {
    var data = {
        quizQuestion: req.body.quizQuestion,
        quizAnswer1: req.body.quizAnswer1,
        quizAnswer2: req.body.quizAnswer2,
        quizAnswer3: req.body.quizAnswer3,
        quizCorrectAnswer: req.body.quizCorrectAnswer,
        quizImg: req.body.quizImg
    }
    var sql ='UPDATE geoQuiz SET quizQuestion = ?, quizAnswer1 = ?, quizAnswer2 = ?, quizAnswer3 = ?, quizCorrectAnswer = ?, quizImg = ? WHERE quizId = ?'
    var params =[data.quizQuestion, data.quizAnswer1, data.quizAnswer2, data.quizAnswer3,data.quizCorrectAnswer,data.quizImg, req.params.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "geoQuiz": data,
            "id" : this.lastID
        })
    });
})
app.delete("/api/geoQuiz/:id", (req, res, next) => {
    db.run(
        'DELETE FROM geoQuiz WHERE quizId = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})

/* Mathematics Quiz */
app.get("/api/matteQuiz", (req, res, next) => {
    var sql = "select * from matteQuiz"
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
app.get("/api/matteQuiz/level", (req, res, next) => {
    var sql = "select * from matteQuiz";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "matteQuiz":rows
        })
    });
});
app.get("/api/matteQuiz/numberOfLevel", (req, res, next) => {
    var sql = 'select quizLevel from matteQuiz GROUP BY quizLevel'
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "matteQuizLevel":rows
        })
    });
});
app.get("/api/matteQuiz/level/:id", (req, res, next) => {
    var sql = "select * from matteQuiz where quizLevel = ?";
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "matteQuiz":rows
        })
    });
});
app.get("/api/matteQuiz/:id", (req, res, next) => {
    var sql = "select * from matteQuiz where quizId = ?"
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
app.post("/api/matteQuiz/", (req, res, next) => {
    const data = {
        quizQuestion: req.body.quizQuestion,
        quizAnswer1: req.body.quizAnswer1,
        quizAnswer2: req.body.quizAnswer2,
        quizAnswer3: req.body.quizAnswer3,
        quizCorrectAnswer: req.body.quizCorrectAnswer,
        quizImg: req.body.quizImg
    }
    const sql = 'INSERT INTO matteQuiz (quizQuestion, quizAnswer1, quizAnswer2, quizAnswer3, quizCorrectAnswer, quizImg) VALUES (?,?,?,?,?,?)'
    const params = [data.quizQuestion, data.quizAnswer1, data.quizAnswer2, data.quizAnswer3, data.quizCorrectAnswer, data.quizImg]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "matteQuiz": data,
            "id": this.lastID
        })
    });
})
app.put("/api/matteQuiz/:id", (req, res, next) => {
    var data = {
        quizQuestion: req.body.quizQuestion,
        quizAnswer1: req.body.quizAnswer1,
        quizAnswer2: req.body.quizAnswer2,
        quizAnswer3: req.body.quizAnswer3,
        quizCorrectAnswer: req.body.quizCorrectAnswer,
        quizImg: req.body.quizImg
    }
    var sql ='UPDATE matteQuiz SET quizQuestion = ?, quizAnswer1 = ?, quizAnswer2 = ?, quizAnswer3 = ?, quizCorrectAnswer = ?, quizImg = ? WHERE quizId = ?'
    var params =[data.quizQuestion, data.quizAnswer1, data.quizAnswer2, data.quizAnswer3,data.quizCorrectAnswer,data.quizImg, req.params.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "matteQuiz": data,
            "id" : this.lastID
        })
    });
})
app.delete("/api/matteQuiz/:id", (req, res, next) => {
    db.run(
      'DELETE FROM matteQuiz WHERE quizId = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({"message":"deleted", rows: this.changes})
      });
})

/* Engelska Quiz */
app.get("/api/engQuiz", (req, res, next) => {
    var sql = "select * from engQuiz"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "engQuiz":rows
        })
    });
});
app.get("/api/engQuiz/level", (req, res, next) => {
    var sql = "select * from engQuiz";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "engQuiz":rows
        })
    });
});
app.get("/api/engQuiz/numberOfLevel", (req, res, next) => {
    const sql = 'select quizLevel from engQuiz GROUP BY quizLevel';
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "engQuizLevel":rows
        })
    });
});
app.get("/api/engQuiz/level/:id", (req, res, next) => {
    var sql = "select * from engQuiz where quizLevel = ?";
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "engQuiz":rows
        })
    });
});
app.get("/api/engQuiz/:id", (req, res, next) => {
    var sql = "select * from engQuiz where quizId = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "engQuiz":row
        })
    });
});
app.post("/api/engQuiz/", (req, res, next) => {
    const data = {
        quizQuestion: req.body.quizQuestion,
        quizLevel: req.body.quizLevel,
        quizAnswer1: req.body.quizAnswer1,
        quizAnswer2: req.body.quizAnswer2,
        quizAnswer3: req.body.quizAnswer3,
        quizCorrectAnswer: req.body.quizCorrectAnswer,
        quizImg: req.body.quizImg
    }
    const sql = 'INSERT INTO geoQuiz (quizQuestion, quizLevel, quizAnswer1, quizAnswer2, quizAnswer3, quizCorrectAnswer, quizImg) VALUES (?,?,?,?,?,?,?)'
    const params = [data.quizQuestion, data.quizLevel, data.quizAnswer1, data.quizAnswer2, data.quizAnswer3, data.quizCorrectAnswer, data.quizImg]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "geoQuiz": data,
            "id" : this.lastID
        })
    });
})
app.put("/api/engQuiz/:id", (req, res, next) => {
    var data = {
        quizQuestion: req.body.quizQuestion,
        quizAnswer1: req.body.quizAnswer1,
        quizAnswer2: req.body.quizAnswer2,
        quizAnswer3: req.body.quizAnswer3,
        quizCorrectAnswer: req.body.quizCorrectAnswer,
        quizImg: req.body.quizImg
    }
    var sql ='UPDATE engQuiz SET quizQuestion = ?, quizAnswer1 = ?, quizAnswer2 = ?, quizAnswer3 = ?, quizCorrectAnswer = ?, quizImg = ? WHERE quizId = ?'
    var params =[data.quizQuestion, data.quizAnswer1, data.quizAnswer2, data.quizAnswer3,data.quizCorrectAnswer,data.quizImg, req.params.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "engQuiz": data,
            "id" : this.lastID
        })
    });
})
app.delete("/api/engQuiz/:id", (req, res, next) => {
    db.run(
      'DELETE FROM engQuiz WHERE quizId = ?',
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
app.get('/api/users', (request, response, next) => {
        const sql = 'select * from users where userRole <> ?';
        const params = ['Admin'];
        db.all(sql, params, (err, rows) => {
            if (err) {
                response.status(400).json({ "error": err.message });
                return;
            }
            response.send({
                "message": "success",
                "users": rows
            })
        });
});
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
});
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
        password: req.body.password,
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

app.post('/api/users/user/', session_Status, (request, response, next) => {
   if (request.body.userId === request.session.userId){
        const userData = {
            userId: request.body.userId,
        }
        db.get('select * from users where userId = ?', [userData.userId], (err, row) => {
            if (err) {
                response.status(400).json({"error":err.message});
                return;
            }
            response.json({
                "message":"success",
                "user":row
            })
            response.end();
        });
   }
});
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
                    message:`Welcome`,
                    fullName: request.session.username,
                    userRole: request.session.userRole,
                    userId: request.session.userId,
                    isSessionCreated: true
                });
            } else {
                response.send({
                    message: `Incorrect Username and/or Password!`,
                    isSessionCreated:  false
                });
            }
            response.end();
        });
    } else {
        response.send({
            message: `Please enter Username and Password!`,
            isSessionCreated:  false
        });
        response.end();
    }
});
app.post('/api/logout', (req, res) => {
    const userData = {
        isSessionActive: req.body.sessionStatus,
    }
        if (userData.isSessionActive){
            req.session.destroy(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.send({
                        message: `Your are disconnected!`
                    });
                    res.end();
                }
            });
    }

})
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

// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

