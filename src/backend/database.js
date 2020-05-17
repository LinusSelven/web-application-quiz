var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "QuizDB.db"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE quiz (
            quizId INTEGER PRIMARY KEY,
            quizQuestion TEXT,
            quizAnswer1 TEXT,
            quizAnswer2 TEXT,
            quizAnswer3 TEXT,
            quizCorrectAnswer INTEGER,
            quizImg TEXT
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
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
                    "<img src=\"../assets/280px-Asia_(orthographic_projection).svg.png\" alt=\"Bild\">"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Antarktis",
                    "Oceanien",
                    "Europa",
                    "3",
                    "<img src=\"../assets/280px-Europe_(orthographic_projection).svg.png\" alt=\"Bild\">"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Nordamerika",
                    "Antarktis",
                    "Oceanien",
                    "2",
                    "<img src=\"../assets/280px-Antarctica_(orthographic_projection).svg.png\" alt=\"Bild\">"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Sydamerika",
                    "Afrika",
                    "Nordamerika",
                    "3",
                    "<img src=\"../assets/280px-Location_North_America.svg.png\" alt=\"Bild\">"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Oceanien",
                    "Afrika",
                    "Antarktis",
                    "1",
                    "<img src=\"../assets/280px-Oceania_(orthographic_projection).svg.png\" alt=\"Bild\">"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Sydamerika",
                    "Nordamerika",
                    "Europa",
                    "1",
                    "<img src=\"../assets/280px-South_America_(orthographic_projection).svg.png\" alt=\"Bild\">"])
            }
        })
        db.run(`CREATE TABLE users (
            userId INTEGER PRIMARY KEY,
            userRole TEXT,
            fullName TEXT,
            email TEXT,
            password TEXT,
            phoneNumber TEXT,
            schoolLevel INTEGER
            )`, (err) => {
            if (err) {
            } else {
                const insert = 'INSERT INTO users (userRole, fullName, email, password, phoneNumber, schoolLevel) VALUES (?,?,?,?,?,?)';
                db.run(insert, ["admin",
                    "Halim Dakir",
                    "halim.halim@iths.se",
                    "123456",
                    "0722000000",
                    "null"])
            }
        })
    }
})
module.exports = db

