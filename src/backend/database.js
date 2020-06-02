var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = 'QuizDB.db'

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
        db.run(insert, ['Vilken världsdel visas?',
          '1',
          'Sydamerika',
          'Asien',
          'Afrika',
          '3',
          '280px-Africa_(orthographic_projection).svg.png'])
        db.run(insert, ['Vilken världsdel visas?',
          '1',
          'Afrika',
          'Asien',
          'Nordamerika',
          '2',
          '280px-Asia_(orthographic_projection).svg.png'])
        db.run(insert, ['Vilken världsdel visas?',
          '1',
          'Antarktis',
          'Oceanien',
          'Europa',
          '3',
          '280px-Europe_(orthographic_projection).svg.png'])
        db.run(insert, ['Vilken världsdel visas?',
          '1',
          'Nordamerika',
          'Antarktis',
          'Oceanien',
          '2',
          '280px-Antarctica_(orthographic_projection).svg.png'])
        db.run(insert, ['Vilken världsdel visas?',
          '1',
          'Sydamerika',
          'Afrika',
          'Nordamerika',
          '3',
          '280px-Location_North_America.svg.png'])
        db.run(insert, ['Vilken världsdel visas?',
          '1',
          'Oceanien',
          'Afrika',
          'Antarktis',
          '1',
          '280px-Oceania_(orthographic_projection).svg.png'])
        db.run(insert, ['Vilken världsdel visas?',
          '1',
          'Sydamerika',
          'Nordamerika',
          'Europa',
          '1',
          '280px-South_America_(orthographic_projection).svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '2',
          'Norge',
          'Finland',
          'Sverige',
          '3',
          '280px-Flag_of_Sweden.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '2',
          'Danmark',
          'Norge',
          'Finland',
          '2',
          '280px-Flag_of_Norway.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '2',
          'Danmark',
          'Island',
          'Sverige',
          '1',
          '280px-Flag_of_Denmark.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '2',
          'Island',
          'Finland',
          'Danmark',
          '1',
          '280px-Flag_of_Iceland.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '2',
          'Norge',
          'Sverige',
          'Finland',
          '3',
          '280px-Flag_of_Finland.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '3',
          'Tyskland',
          'Tjeckien',
          'Polen',
          '1',
          '280px-Flag_of_Germany.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '3',
          'Frankrike',
          'Nederländerna',
          'Tjeckien',
          '2',
          '280px-Flag_of_the_Netherlands.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '3',
          'Polen',
          'Tyskland',
          'Österrike',
          '1',
          '280px-Flag_of_Poland.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '3',
          'Tjeckien',
          'Tyskland',
          'England',
          '1',
          '280px-Flag_of_the_Czech_Republic.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '3',
          'Polen',
          'Frankrike',
          'Österrike',
          '3',
          '280px-Flag_of_Austria.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '3',
          'Finland',
          'Tyskland',
          'England',
          '3',
          '280px-Flag_of_England.svg.png'])
        db.run(insert, ['Vems flagga visas?',
          '3',
          'Tjeckien',
          'Frankrike',
          'Nederländerna',
          '2',
          '280px-Flag_of_France.svg.png'])

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
        db.run(insert1, ['4 + 5 = ?',
          '1',
          '11',
          '7',
          '9',
          '3',
          'math.png'])
        db.run(insert1, ['7 - 3 = ?',
          '1',
          '5',
          '4',
          '2',
          '2',
          'math.png'])
        db.run(insert1, ['3 * 4 = ?',
          '1',
          '14',
          '10',
          '12',
          '3',
          'math.png'])
        db.run(insert1, ['8 / 2 = ?',
          '1',
          '3',
          '4',
          '6',
          '2',
          'math.png'])
        db.run(insert1, ['Ruben, Harry och Kattja ska dela lika på 18 jordgubbar, hur många får de var?',
          '1',
          '7 stycken.',
          '4 stycken.',
          '6 stycken.',
          '3',
          'math.png'])
        db.run(insert1, ['16 + 9 = ?',
          '1',
          '25',
          '27',
          '22',
          '1',
          'math.png'])
        db.run(insert1, ['34 - 14 = ?',
          '1',
          '20',
          '24',
          '30',
          '1',
          'math.png'])

        db.run(insert1, ['Vad är klockan ?',
          '2',
          'Klockan fyra',
          'Fem  över  fyra',
          'Fem  i fyra',
          '3',
          '1c.png'])
        db.run(insert1, ['Vad är klockan ?',
          '2',
          'Fem över tio',
          'Klockan ett',
          'halv tio',
          '1',
          '2c.png'])
        db.run(insert1, ['Vad är klockan ?',
          '2',
          'Klockan två',
          'Kvart i två',
          'Halv nio',
          '2',
          '3c.png'])
        db.run(insert1, ['Vad är klockan ?',
          '2',
          'Tjugo i nio',
          'Klockan nio',
          'Halv åtta',
          '1',
          '4c.png'])
        db.run(insert1, ['Vad är klockan ?',
          '2',
          'Klockan fyra',
          'Kvart över fyra ',
          'Klockan tre',
          '2',
          '5c.png'])
        db.run(insert1, ['Vad är klockan ?',
          '2',
          'Fem i halv åtta',
          'Halv åtta',
          'Klockan fem',
          '1',
          '6c.png'])
        db.run(insert1, ['Vad är klockan ?',
          '2',
          'Halv elva',
          'Tolv',
          'Halv tolv',
          '3',
          '7c.png'])

        db.run(insert1, ['Figuren är en',
          '3',
          'Cirkel',
          'Kub',
          'Rektangel',
          '3',
          '1sh.png'])
        db.run(insert1, ['Figuren är en',
          '3',
          'Kub',
          'Cirkel',
          'Rektangel',
          '2',
          '2sh.png'])
        db.run(insert1, ['Figuren är en',
          '3',
          'Cirkel',
          'Rektangel',
          'Triangel',
          '3',
          '3sh.png'])
        db.run(insert1, ['Figuren är en',
          '3',
          'Kub',
          'Kvadrat',
          'Rektangel',
          '2',
          '4sh.png'])
        db.run(insert1, ['Figuren är en',
          '3',
          'Cirkel',
          'Rektangel',
          'Kon',
          '3',
          '5sh.png'])
        db.run(insert1, ['Figuren är en',
          '3',
          'Pyramid',
          'Triangel',
          'Kub',
          '1',
          '6sh.png'])
        db.run(insert1, ['Figuren är en',
          '3',
          'Cylinder',
          'Cirkel',
          'Kon',
          '1',
          '7sh.png'])

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

        db.run(insert1, ['What color is it?',
          '1',
          'blå',
          'blue',
          'blue.png'])
        db.run(insert1, ['What color is it?',
          '1',
          'grön',
          'green',
          'green.png'])
        db.run(insert1, ['What color is it?',
          '1',
          'röd',
          'red',
          'red.png'])
        db.run(insert1, ['What color is it?',
          '1',
          'vit',
          'white',
          'white.png'])
        db.run(insert1, ['What color is it?',
          '1',
          'gul',
          'yellow',
          'yellow.png'])
        db.run(insert1, ['What color is it?',
          '1',
          'gul',
          'yellow',
          'yellow.png'])
        db.run(insert1, ['What color is it?',
          '1',
          'gul',
          'yellow',
          'yellow.png'])

        db.run(insert1, ['What animal is it? ',
          '2',
          'Häst',
          'horse',
          'horse.png'])
        db.run(insert1, ['What animal is it?',
          '2',
          'Hund',
          'dog',
          'dog.png'])
        db.run(insert1, ['What animal is it?',
          '2',
          'fågel',
          'bird',
          'bird.png'])
        db.run(insert1, ['What animal is it?',
          '2',
          'kanin',
          'rabbit',
          'rabbit.png'])
        db.run(insert1, ['What animal is it?',
          '2',
          'ko',
          'cow',
          'cow.png'])
        db.run(insert1, ['What animal is it?',
          '2',
          'får',
          'sheep',
          'sheep.png'])
        db.run(insert1, ['What animal is it?',
          '2',
          'katt',
          'cat',
          'cat.png'])

        db.run(insert1, ['Vad heter "läsa" på engelska?',
          '3',
          'läsa',
          'read',
          'read.png'])
        db.run(insert1, ['Vad heter "hoppa" på engelska?',
          '3',
          'hoppa',
          'jump',
          'jump.png'])
        db.run(insert1, ['Vad heter "spela" på engelska?',
          '3',
          'spela',
          'play',
          'play.png'])
        db.run(insert1, ['Vad heter "skriva" på engelska?',
          '3',
          'skriva',
          'write',
          'write.png'])
        db.run(insert1, ['Vad heter "sova " på engelska?',
          '3',
          'sova',
          'sleep',
          'sleep.png'])
        db.run(insert1, ['Vad heter "skriva" på engelska?',
          '3',
          'skriva',
          'write',
          'write.png'])
        db.run(insert1, ['Vad heter "skriva" på engelska?',
          '3',
          'skriva',
          'write',
          'write.png'])
      }
    })

    //---------------

    db.run(`CREATE TABLE svenskaQuiz (
            quizId INTEGER PRIMARY KEY,
            quizLevel INTEGER,
            quizPart1 TEXT,
            quizPart2 TEXT,
            quizPart3 TEXT,
            quizAnswer1 TEXT,
            quizAnswer2 TEXT,
            quizAnswer3 TEXT,
            quizCorrectPos1 INTEGER,
            quizCorrectPos2 INTEGER,
            quizCorrectPos3 INTEGER
       )`, (err) => {
      if (err) {
        // Table already created
      } else {
        // Table just created, creating some rows
        var insert1 = 'INSERT INTO svenskaQuiz (quizLevel, quizPart1, quizPart2, quizPart3, quizAnswer1, quizAnswer2, ' +
          'quizAnswer3, quizCorrectPos1, quizCorrectPos2, quizCorrectPos3) VALUES (?,?,?,?,?,?,?,?,?,?)'
        db.run(insert1, [
          1,
          'Jag ',
          'ut, för att ',
          'till min ',
          'handla',
          'gick',
          'mormor',
          2,
          1,
          3])
        db.run(insert1, [
          2,
          'De ',
          'till ',
          'för att ',
          'plugga',
          'cyklade',
          'skolan',
          2,
          3,
          1])

      }
    })

    //---------------
    db.run(`CREATE TABLE users (
            userId INTEGER PRIMARY KEY,
            userRole TEXT,
            fullName TEXT,
            email TEXT,
            password TEXT,
            phoneNumber TEXT
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                const insert = 'INSERT INTO users (userRole, fullName, email, password, phoneNumber) VALUES (?,?,?,?,?)';
                db.run(insert, ["Admin",
                    "Halim Halim",
                    "halim.halim@iths.se",
                    "123456",
                    "0722000000"
                ])
                db.run(insert, ["Student",
                    "Milo Milo",
                    "milo@iths.se",
                    "112233",
                    "0766000999"
                ])
                db.run(insert, ["Teacher",
                    " Miko Miko",
                    "miko@iths.se",
                    "445566",
                    "0788000111"
                ])
            }
    })

  }
})

module.exports = db