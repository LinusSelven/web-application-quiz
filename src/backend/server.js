var express = require("express")
var app = express()
var cors = require('cors')
var db = require("./database.js")

app.use(cors())
app.use(express.static('public'))

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 3000

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
/* Post users */
app.post("/api/users/", (req, res, next) => {
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.passWord,
        phoneNumber: req.body.phoneNumber,
        level: req.body.level,
    }
    const sql = 'INSERT INTO users (fullName, email, password, phoneNumber, level) VALUES (?,?,?,?,?)';
    const params = [userData.fullName, userData.email, userData.password, userData.phoneNumber, userData.level];
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "users": userData,
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

// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

