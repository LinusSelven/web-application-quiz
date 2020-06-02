<template>

    <div class="svenskaquiz">

        <div v-if="!isDone" class="q-question">
            <h1>Quiz Level: {{selectedLevel}} / {{quizLevel.length}}   |    Question: {{questionNumber+1}} / {{svenskaQuiz.length}}</h1>
            <h2>Placera ordet i rätt plats</h2>

            <div class="q-words-box" id="box-0">
                <p id="answer-1" :draggable="true" @dragstart="dragStart" @dragover.stop>
                    {{svenskaQuiz[questionNumber].quizAnswer1}}</p>
                <p id="answer-2" :draggable="true" @dragstart="dragStart" @dragover.stop>
                    {{svenskaQuiz[questionNumber].quizAnswer2}}</p>
                <p id="answer-3" :draggable="true" @dragstart="dragStart" @dragover.stop>
                    {{svenskaQuiz[questionNumber].quizAnswer3}}</p>
            </div>

            <div class="q-answer">
                <div class="part"><p>{{svenskaQuiz[questionNumber].quizPart1}}</p></div>
                <div class="empty" id="box-1" @dragover.prevent @drop.prevent="drop"></div>
                <div class="part"><p>{{svenskaQuiz[questionNumber].quizPart2}}</p></div>
                <div class="empty" id="box-2" @dragover.prevent @drop.prevent="drop"></div>
                <div class="part"><p>{{svenskaQuiz[questionNumber].quizPart3}}</p></div>
                <div class="empty" id="box-3" @dragover.prevent @drop.prevent="drop"></div>
            </div>
            <button class="q-btn" @click="nextQuestion()">Nästa fråga
            </button>
        </div>
        <div v-if="isDone" class="q-result">
            <button class="q-btn" @click="nextLevelQuiz">Next Quiz</button>
            <button class="q-btn" @click="redoQuiz">Last Quiz</button>
            <h2>{{nextQuizMessage}}</h2>
            <img src="../assets/result1.png" alt="res" class="res">
            <h1 class="finalScore">{{finalScore}} %</h1>
            <p class="showScoresSve" id="showScoresSve"></p>
        </div>
       <!-- VAD ÄR DEN => <h2>{{countOfCorrectAnswers}} / {{svenskaQuiz.length * 3}}</h2> -->
    </div>
</template>


<script>
    import ApiServices from '../services/ApiServices'

    export default {
        name: 'svenskaQuiz',
        data: function () {
            return {
                svenskaQuiz: [],
                quizLevel: [],
                sveScores:[],
                questionNumber: 0,
                countOfCorrectAnswers: 0,
                selectedLevel: 1, /* default */
                isDone: false,
                finalScore : 0,
                nextQuizMessage: '',
                numberOfLevel: 0,
            }
        },

        methods: {
            nextQuestion: function () {
                this.resultat = '';
                this.key = '0';
                this.resetAnswerPositions()
                this.countQuestions();
                this.percentageScore();
            },

            drop: function (e) {
                const card_id = e.dataTransfer.getData('text')
                if (e.target.childNodes.length < 1 || e.target.id == 'box-0') {
                    e.target.appendChild(document.getElementById(card_id))
                    this.userChoseAnswer(e.target.id, card_id)
                }

            },

            dragStart: e => {
                e.dataTransfer.setData('text', e.target.id)
            },

            userChoseAnswer: function (box, answer) {
                let selectedBox = box.split('-')[1]
                let selectedAnswer = answer.split('-')[1]
                document.getElementById(answer).setAttribute('draggable', 'false')
                switch (selectedBox) {
                    case '1':
                        if (selectedAnswer == this.svenskaQuiz[this.questionNumber].quizCorrectPos1)
                            this.countOfCorrectAnswers += 1;
                        break;
                    case '2':
                        if (selectedAnswer == this.svenskaQuiz[this.questionNumber].quizCorrectPos2)
                            this.countOfCorrectAnswers += 1;
                        break;
                    case '3':
                        if (selectedAnswer == this.svenskaQuiz[this.questionNumber].quizCorrectPos3)
                            this.countOfCorrectAnswers += 1;
                        break;
                    default:
                        break;
                }
            },

            resetAnswerPositions: function () {
                const startPos = document.getElementById('box-0')
                const box1 = document.getElementById('box-1');
                const box2 = document.getElementById('box-2');
                const box3 = document.getElementById('box-3');
                while (box1.childNodes.length > 0 && box2.childNodes.length > 0 && box3.childNodes.length > 0) {
                    startPos.appendChild(box1.childNodes[0])
                    startPos.appendChild(box2.childNodes[0])
                    startPos.appendChild(box3.childNodes[0])
                }
                const startChildren = startPos.children;
                for (let startChild of startChildren) {
                    startChild.setAttribute('draggable', 'true')
                }
            },
            async countQuestions () {
              this.questionNumber += 1;
              if (this.questionNumber === this.svenskaQuiz.length) {
                this.isDone = true;
                await this.addScores();
                await this.getScores();
                this.createScoresTable();
              }
            },

            nextLevelQuiz(){
                if(this.finalScore >= 50){
                    if (this.selectedLevel<this.quizLevel.length ){
                        this.selectedLevel +=1 ;
                        this.fetchNextQuiz(this.selectedLevel);
                        this.countOfCorrectAnswers=0;
                        this.questionNumber= 0;
                        this.isDone =false;
                        this.nextQuizMessage='';
                    }else{
                        this.nextQuizMessage='Sorry! There is no next level for the moment.';
                    }
                }else {
                    this.nextQuizMessage='You have to get at least 50 % correct';
                }
            },

            redoQuiz(){
                this.fetchNextQuiz(this.selectedLevel);
                this.countOfCorrectAnswers=0;
                this.questionNumber= 0;
                this.isDone =false;
                this.nextQuizMessage='';
            },
            percentageScore(){
                let amount = this.svenskaQuiz.length;
                let scorePerQuestion = 100/amount;
                this.finalScore = Math.round((this.countOfCorrectAnswers * scorePerQuestion) / 3);
            },

            fetchNextQuiz(level){
                fetch('http://127.0.0.1:3000/api/svenskaquiz/level/'+level)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        this.svenskaQuiz = data.svenskaQuiz;
                    });
            },
          async addScores() {
            if (JSON.parse(sessionStorage.getItem('userLogged')).userId && this.isDone === true ){
              let checkScoreId = await ApiServices.checkScoresIfIsExist({
                subject: 'Swedish',
                subjectLevel: this.selectedLevel,
                userId: parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId)
              });
              if (!checkScoreId.data.isExist){
                await ApiServices.addScore({
                  subject: 'Swedish',
                  subjectLevel: this.selectedLevel,
                  score: this.finalScore,
                  userFullName: JSON.parse(sessionStorage.getItem('userLogged')).fullName,
                  userId: parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId)
                });
              }else {
                let checkScoreIsHigh = await ApiServices.checkScoresIfHigh({
                  scoreId: checkScoreId.data.scoreId,
                  score: this.finalScore
                });
                if (checkScoreIsHigh.data.isHigh){
                  await ApiServices.updateScores(checkScoreId.data.scoreId, {
                    score: this.finalScore
                  });
                }
              }
            }
          },
          async getScores() {
            if (JSON.parse(sessionStorage.getItem('userLogged')).userId){
              let response = await ApiServices.getScore({
                subject: 'Swedish',
                subjectLevel: this.selectedLevel
              });
              this.sveScores= response.data.scores;
            }
          },
          createScoresTable() {
            const table = document.createElement('table')
            table.className = "userTable";
            let i,j;
            const arrItems = this.sveScores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
            const col = []
            for (i = 0; i < arrItems.length; i++) {
              for (const key in arrItems[i]) {
                if (col.indexOf(key) === -1) {
                  col.push(key);
                }
              }
            }
            col.push('rank');
            let tr = table.insertRow(-1)
            for (i = 0; i < col.length; i++) {
              const th = document.createElement('th')
              th.innerHTML = col[i];
              tr.appendChild(th);
            }
            for (i = 0; i < arrItems.length; i++) {
              tr = table.insertRow(-1);
              for (j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1)
                tabCell.innerHTML = arrItems[i][col[j]];
              }
              tabCell.innerHTML =i + 1;
            }
            const divContainer = document.getElementById('showScoresSve')
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
          },
        },

        mounted() {
            fetch('http://127.0.0.1:3000/api/svenskaquiz/numberOfLevel')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.quizLevel = data.svenskaQuizLevel;
                });
            fetch('http://127.0.0.1:3000/api/svenskaquiz/level/' + this.selectedLevel)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.svenskaQuiz = data.svenskaQuiz;
                });
        }
    }
</script>


<style scoped>

    input {
        padding: 10px;
        margin-top: 2px;
        margin-bottom: 2px;
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
        font-family: Calibri, monospace;
        font-size: 24px;
        font-weight: bold;
        height: 50px;
        width: 300px;
        cursor: pointer;
    }

    .svenskaquiz[data-v-005fc852] {
        background: rgba(0, 0, 0, .7);
        display: table-cell;
        text-align: center;
        width: 100%;
    }

    .q-question {
        margin: 0 auto;
        display: table;
        width: 70%;
        border-right: none;
        box-sizing: border-box;
    }

    .q-words-box {
        padding-top: 50px;
        padding-bottom: 50px;
    }

    .q-words-box p {
        display: inline;
        padding: 1em;
        margin: 1em;
        margin-right: 5px;
        margin-top: 50px;
        background-color: #333333;
        font-family: "Times New Roman", monospace;
        font-size: 20px;
        color: wheat;
        height: 30px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        opacity: 90%;
    }

    .q-question > .q-answer {
        display: inline-table;
        text-align: center;
        width: 100%;
        margin-right: 5px;
        margin-top: 50px;
        background-color: #333333;
        font-family: "Times New Roman", monospace;
        font-size: 20px;
        color: wheat;
        height: 30px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        opacity: 90%;
    }

    .q-question > .q-answer > .empty {
        display: table-cell;
        text-align: center;
        width: 13%;
        margin-right: 5px;
        margin-top: 50px;
        background-color: #333333;
        font-family: "Times New Roman", monospace;
        font-size: 20px;
        color: wheat;
        height: 30px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        opacity: 90%;
    }
    .q-result{
        color: #02b3b3;
        text-align: center;
    }
    img{
        max-width: 100%;
        max-height: 100%;
        display: block;
    }
    h1{
        background: rgba(0, 0, 0, 0.9);
        font-family: "Nirmala UI Semilight", monospace;
        font-size: x-large;
        color: wheat;
        border-bottom: 1px solid black;
        margin:auto;
    }

    img {
        max-width: 100%;
        max-height: 100%;
        display: block;
    }


    .q-btn {
        width: 100%;
        margin-right: 5px;
        margin-top: 50px;
        background-color: #333333;
        font-family: "Times New Roman", monospace;
        font-size: 20px;
        color: wheat;
        height: 30px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        opacity: 90%;
    }

    .q-btn:hover {
        background-color: #e9e608;
        color: black;
        cursor: pointer;
    }


    h2, h3 {
        font-family: "Times New Roman", monospace;
        color: wheat;
    }

    .right-answer {
        color: #06d4ee;
    }
    .res{
        margin: 0 auto;
        width:35%;
        height: 35%;
        display: block;
    }

    /* Mobile */
    @media screen and (max-width: 400px) {
    }

    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    }

    /* Desktop */
    @media screen and (min-width: 1025px) {
        .svenskaquiz {
            display: table-cell;
            text-align: center;
            vertical-align: top;
            background: rgba(0, 0, 0, 0.7);
        }
        h1{
            padding: 13px;
        }
        .q-btn {
            margin-top: 20px;
            width: 32%;
            height: 50px;
        }
        .finalScore{
            padding: 13px;
            width: 100px;
        }
        .showScoresSve{
            padding: 10px;
        }
        .q-result{
            margin: auto;
            width: 60%;
        }
    }


</style>