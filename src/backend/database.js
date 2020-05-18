var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "QuizDB.db"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
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
                    "280px-Africa_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Afrika",
                    "Asien",
                    "Nordamerika",
                    "2",
                    "280px-Asia_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Antarktis",
                    "Oceanien",
                    "Europa",
                    "3",
                    "280px-Europe_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Nordamerika",
                    "Antarktis",
                    "Oceanien",
                    "2",
                    "280px-Antarctica_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Sydamerika",
                    "Afrika",
                    "Nordamerika",
                    "3",
                    "280px-Location_North_America.svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Oceanien",
                    "Afrika",
                    "Antarktis",
                    "1",
                    "280px-Oceania_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "Sydamerika",
                    "Nordamerika",
                    "Europa",
                    "1",
                    "280px-South_America_(orthographic_projection).svg.png"])
            }
        })

        //---------------

        db.run(`CREATE TABLE mattequiz (
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
                var insert1 = 'INSERT INTO mattequiz (quizQuestion, quizAnswer1, quizAnswer2, quizAnswer3, quizCorrectAnswer, quizImg) VALUES (?,?,?,?,?,?)'
                db.run(insert1, ["4 + 5 = ?",
                    "11",
                    "7",
                    "9",
                    "3",
                    "mathematics.jpg"])
                db.run(insert1, ["7 - 3 = ?",
                    "5",
                    "4",
                    "2",
                    "2",
                    "mathematics.jpg"])
                db.run(insert1, ["3 * 4 = ?",
                    "14",
                    "10",
                    "12",
                    "3",
                    "mathematics.jpg"])
                db.run(insert1, ["8 / 2 = ?",
                    "3",
                    "4",
                    "6",
                    "2",
                    "mathematics.jpg"])
                db.run(insert1, ["Ruben, Harry och Kattja ska dela lika på 18 jordgubbar, hur många får de var?",
                    "7 stycken.",
                    "4 stycken.",
                    "6 stycken.",
                    "3",
                    "strawberry.png"])
                db.run(insert1, ["16 + 9 = ?",
                    "25",
                    "27",
                    "22",
                    "1",
                    "mathematics.jpg"])
                db.run(insert1, ["34 - 14 = ?",
                    "20",
                    "24",
                    "30",
                    "1",
                    "mathematics.jpg"])

            }
        })



        //---------------
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
                // Table already created
            } else {
                const insert = 'INSERT INTO users (userRole, fullName, email, password, phoneNumber, schoolLevel) VALUES (?,?,?,?,?,?)';
                db.run(insert, ["Admin",
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