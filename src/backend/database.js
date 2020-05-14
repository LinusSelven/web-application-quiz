var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "quiz.db"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE quiz (
            quizId INTEGER PRIMARY KEY,
            quizQuestion TEXT,
            quizAnswer1 TEXT,
            quizAnswer2 TEXT,
            quizAnswer3 TEXT,
            quizCorrectAnswer INTEGER,
            quizImg TEXT
            )`,(err) => {
        if (err) {
            // Table already created
        }else{
            // Table just created, creating some rows
            var insert = 'INSERT INTO quiz (quizQuestion, quizAnswer1, quizAnswer2, quizAnswer3, quizCorrectAnswer, quizImg) VALUES (?,?,?,?,?,?)'
            db.run(insert, ["Vilken världsdel visas?",
                "Sydamerika",
                "Asien",
                "Afrika",
                "3",
                "img0.png"])
            db.run(insert, ["Vilken världsdel visas?",
                "Afrika",
                "Asien",
                "Nordamerika",
                "2",
                "img1.png"])
        }
        })

        db.run(`CREATE TABLE users (
            userId INTEGER PRIMARY KEY,
            userRole TEXT,
            fullName TEXT,
            email TEXT,
            passWord TEXT,
            phoneNumber TEXT,
            level INTEGER
            )`,(err) => {
            if (err) {
            }else {
                const insert = 'INSERT INTO users (userRole, fullName, email, passWord, phoneNumber, level) VALUES (?,?,?,?,?,?)';
                db.run(insert, ["student",
                        "Halim Halim",
                        "halim.halim@iths.se",
                        "123456",
                        "0722000000",
                        "4"])
                }
            })
        }
})


module.exports = db

