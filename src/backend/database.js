var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "QuizDB.db"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE geoQuiz (
            quizId INTEGER PRIMARY KEY,
            quizQuestion TEXT,
            quizLevel INTEGER,
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
                var insert = 'INSERT INTO geoQuiz (quizQuestion, quizLevel, quizAnswer1, quizAnswer2, quizAnswer3, quizCorrectAnswer, quizImg) VALUES (?,?,?,?,?,?,?)'
                db.run(insert, ["Vilken världsdel visas?",
                    "1",
                    "Sydamerika",
                    "Asien",
                    "Afrika",
                    "3",
                    "280px-Africa_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "1",
                    "Afrika",
                    "Asien",
                    "Nordamerika",
                    "2",
                    "280px-Asia_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "1",
                    "Antarktis",
                    "Oceanien",
                    "Europa",
                    "3",
                    "280px-Europe_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "2",
                    "Nordamerika",
                    "Antarktis",
                    "Oceanien",
                    "2",
                    "280px-Antarctica_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "2",
                    "Nordamerika",
                    "Antarktis",
                    "Oceanien",
                    "2",
                    "280px-Antarctica_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "3",
                    "Sydamerika",
                    "Afrika",
                    "Nordamerika",
                    "3",
                    "280px-Location_North_America.svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "1",
                    "Oceanien",
                    "Afrika",
                    "Antarktis",
                    "1",
                    "280px-Oceania_(orthographic_projection).svg.png"])
                db.run(insert, ["Vilken världsdel visas?",
                    "1",
                    "Sydamerika",
                    "Nordamerika",
                    "Europa",
                    "1",
                    "280px-South_America_(orthographic_projection).svg.png"])
            }
        })

        //---------------

        db.run(`CREATE TABLE matteQuiz (
            quizId INTEGER PRIMARY KEY,
            quizQuestion TEXT,
            quizLevel INTEGER,
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
                var insert1 = 'INSERT INTO matteQuiz (quizQuestion,quizLevel, quizAnswer1, quizAnswer2, quizAnswer3, quizCorrectAnswer, quizImg) VALUES (?,?,?,?,?,?,?)'
                db.run(insert1, ["4 + 5 = ?",
                    "1",
                    "11",
                    "7",
                    "9",
                    "3",
                    "math.png"])
                db.run(insert1, ["7 - 3 = ?",
                    "1",
                    "5",
                    "4",
                    "2",
                    "2",
                    "math.png"])
                db.run(insert1, ["3 * 4 = ?",
                    "1",
                    "14",
                    "10",
                    "12",
                    "3",
                    "math.png"])
                db.run(insert1, ["8 / 2 = ?",
                    "1",
                    "3",
                    "4",
                    "6",
                    "2",
                    "math.png"])
                db.run(insert1, ["Ruben, Harry och Kattja ska dela lika på 18 jordgubbar, hur många får de var?",
                    "1",
                    "7 stycken.",
                    "4 stycken.",
                    "6 stycken.",
                    "3",
                    "math.png"])
                db.run(insert1, ["16 + 9 = ?",
                    "1",
                    "25",
                    "27",
                    "22",
                    "1",
                    "math.png"])
                db.run(insert1, ["34 - 14 = ?",
                    "1",
                    "20",
                    "24",
                    "30",
                    "1",
                    "math.png"])

                db.run(insert1, ["Vad är klockan ?",
                    "2",
                    "Klockan fyra",
                    "Fem  över  fyra",
                    "Fem  i fyra",
                    "3",
                    "1c.png"])
                db.run(insert1, ["Vad är klockan ?",
                    "2",
                    "Fem över tio",
                    "Klockan ett",
                    "halv tio",
                    "1",
                    "2c.png"])
                db.run(insert1, ["Vad är klockan ?",
                    "2",
                    "Klockan två",
                    "Kvart i två",
                    "Halv nio",
                    "2",
                    "3c.png"])
                db.run(insert1, ["Vad är klockan ?",
                    "2",
                    "Tjugo i nio",
                    "Klockan nio",
                    "Halv åtta",
                    "1",
                    "4c.png"])
                db.run(insert1, ["Vad är klockan ?",
                    "2",
                    "Klockan fyra",
                    "Kvart över fyra ",
                    "Klockan tre",
                    "2",
                    "5c.png"])
                db.run(insert1, ["Vad är klockan ?",
                    "2",
                    "Fem i halv åtta",
                    "Halv åtta",
                    "Klockan fem",
                    "1",
                    "6c.png"])
                db.run(insert1, ["Vad är klockan ?",
                    "2",
                    "Halv elva",
                    "Tolv",
                    "Halv tolv",
                    "3",
                    "7c.png"])

                db.run(insert1, ["Figuren är en",
                    "3",
                    "Cirkel",
                    "Kub",
                    "Rektangel",
                    "3",
                    "1sh.png"])
                db.run(insert1, ["Figuren är en",
                    "3",
                    "Kub",
                    "Cirkel",
                    "Rektangel",
                    "2",
                    "2sh.png"])
                db.run(insert1, ["Figuren är en",
                    "3",
                    "Cirkel",
                    "Rektangel",
                    "Triangel",
                    "3",
                    "3sh.png"])
                db.run(insert1, ["Figuren är en",
                    "3",
                    "Kub",
                    "Kvadrat",
                    "Rektangel",
                    "2",
                    "4sh.png"])
                db.run(insert1, ["Figuren är en",
                    "3",
                    "Cirkel",
                    "Rektangel",
                    "Kon",
                    "3",
                    "5sh.png"])
                db.run(insert1, ["Figuren är en",
                    "3",
                    "Pyramid",
                    "Triangel",
                    "Kub",
                    "1",
                    "6sh.png"])
                db.run(insert1, ["Figuren är en",
                    "3",
                    "Cylinder",
                    "Cirkel",
                    "Kon",
                    "1",
                    "7sh.png"])

            }
        })


        //---------------

        db.run(`CREATE TABLE engQuiz (
            quizId INTEGER PRIMARY KEY,
            quizQuestion TEXT,
            quizLevel INTEGER,
            quizAnswer1 TEXT,
            quizCorrectAnswer TEXT,
            quizImg TEXT

            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert1 = 'INSERT INTO engQuiz (quizQuestion,quizLevel, quizAnswer1, quizCorrectAnswer, quizImg) VALUES (?,?,?,?,?)'
                db.run(insert1, ["Vad heter häst? ",
                    "1",
                    "Häst",
                    "horse",
                    "horse.png"])
                db.run(insert1, ["Vad heter hund?",
                    "1",
                    "Hund",
                    "dog",
                    "dog.png"])
                db.run(insert1, ["Vad heter fågel?",
                    "1",
                    "fågel",
                    "bird",
                    "bird.png"])
                db.run(insert1, ["Vad heter kanin?",
                    "2",
                    "kanin",
                    "rabbit",
                    "rabbit.png"])
                db.run(insert1, ["Vad heter ko?",
                    "2",
                    "ko",
                    "cow",
                    "cow.png"])
                db.run(insert1, ["Vad heter får?",
                    "3",
                    "får",
                    "sheep",
                    "sheep.png"])
                db.run(insert1, ["Vad heter katt?",
                    "3",
                    "katt",
                    "cat",
                    "cat.png"])

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
                    "Halim Halim",
                    "halim.halim@iths.se",
                    "123456",
                    "0722000000",
                    "null"])
            }
        })

    }
})

module.exports = db