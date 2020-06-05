<template>
    <div class="about">
        <div v-if="!isDone" class="q-question">
            <h1>QUIZ: ENGELSKA    |    LEVEL: {{selectedLevel}}    |    QUESTION: {{questionNumber+1}} / {{engQuiz.length}}</h1>
            <div>
                <br>
                <h2>{{engQuiz[questionNumber].quizQuestion}}</h2>
                <br>
            </div>
            <div class="q-img">

                    <img :src="getImgUrl(engQuiz[questionNumber].quizImg)" v-bind:alt="pic">

            </div>
            <div class="q-answer">

         <!--       <p> {{engQuiz[questionNumber].quizAnswer1}}</p>   -->
                <input class="questionInput" value="" type="text"  placeholder="Write here.. "  id="answer">
                <button class="q-btn" @click="showCorrectAnswer() ">Check the answer</button>
                <div  class="correct" v-show="correctAnswer">
                    <h3> The correct answer is :   {{engQuiz[questionNumber].quizCorrectAnswer}}</h3>
                    <button class="q-btn" @click="userChoseAnswer() " :disabled="userHasGuessed" value="1">Next</button>
                </div>


            </div>
        </div>
        <div v-if="isDone && !scoreShow && !rateShow" class="q-result">
            <button class="q-btn-red" @click="redoQuiz">Last Quiz</button>
            <button class="q-btn-black" @click="scoreShow=true" onclick="scoresTable()">Quiz Score</button>
            <button class="q-btn-black" @click="rateShow=true" onclick="ratesTable()">Rate Quiz</button>
            <button class="q-btn-blue" @click="nextLevelQuiz">Next Quiz</button>
            <img src="../assets/result1.png" alt="res" class="res">
            <h1 class="finalScore">{{finalScore}} %</h1>
            <br><br>
            <h2>{{nextQuizMessage}}</h2>
        </div>

        <div class="q-score" v-show="isDone && scoreShow">
            <h1>HIGH SCORES : ENGELSKA  |  LEVEL : {{selectedLevel}}</h1>
            <button class="q-btn-red" @click="scoreShow=false"><img class="btn-icon" src="../assets/icon/und.png" width="16" height="16" alt="back"></button>
            <br><br>
            <div class="q-result">
                <table class="userTable" id="userTable"></table>
            </div>
        </div>

        <div class="q-rate" v-show="isDone && rateShow">
            <h1>RATE : ENGELSKA  |  LEVEL : {{selectedLevel}}</h1>
            <button class="q-btn-red" @click="feedback()"><img class="btn-icon" src="../assets/icon/und.png" width="16" height="16" alt="back"></button>
            <br><br>
            <div class="q-result">
                <p>{{rateMessage}}</p>
                <form>
                    <select id="stars" name="stars" @change="onChangeRate($event)" v-model="rateValue">
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                    <textarea placeholder="Your text here ..." v-model="textArea"></textarea>
                    <button class="btn-rate" type="button" @click="addMyRates()">Rate</button>
                </form><br>
                <table class="userTable" id="rateTable" style="background-color: rgba(3, 0, 0, 0.46); border-collapse: separate;"></table>
            </div>
        </div>
    </div>
</template>

<script>
  import ApiServices from '../services/ApiServices'
  import $ from 'jquery'

  export default {
    name: "engQuiz",
    data: function () {
      return {
        engQuiz: [],
        quizLevel:[],
        levelsNum:[],
        engScores:[],
        engRates:[],
        questionNumber: 0,
        countOfCorrectAnswers: 0,
        userHasGuessed: false,
        selectedLevel : 1, /* default */
        isDone:false,
        finalScore:0,
        nextQuizMessage:'',
        numberOfLevel:0,
        answer:"",
        correctAnswer:false,
        counter:1,
        rateValue:5,
        textArea:'',
        rateMessage:'',
        scoreShow:false,
        rateShow:false,
      }
    },

    methods: {
      onChangeRate (event) {
        this.rateValue = parseInt(event.target.value);
      },
      feedback(){
        this.rateShow = this.rateShow = false;
        this.rateMessage='';
      },
      nextQuestion() {
        this.userHasGuessed = false;
      },
      userChoseAnswer: function () {
        this.correctAnswer=false;
        this.userHasGuessed = true;
        this.answer = document.getElementById("answer").value;
        if ((this.answer.toLocaleLowerCase())===(this.engQuiz[this.questionNumber].quizCorrectAnswer)){
          this.countOfCorrectAnswers += 1;

        }
        document.getElementById("answer").value="";
        this.nextQuestion();
        this.countQuestions();
        this.percentageScore();
      },
      showCorrectAnswer(){
        this.correctAnswer=true;
      },

      async countQuestions () {
        this.questionNumber += 1;
        if (this.questionNumber === this.engQuiz.length) {
          this.isDone = true;
          await this.getRates();
          this.ratesTable();
          await this.addScores();
          await this.getScores();
          this.scoresTable();
        }
      },
      nextLevelQuiz(){
        if(this.finalScore >= 50){
          if (this.counter<this.quizLevel.length ){
            this.selectedLevel = this.quizLevel[this.counter];
            this.fetchNextQuiz(this.selectedLevel);
            this.userHasGuessed = false;
            this.countOfCorrectAnswers = 0;
            this.questionNumber = 0;
            this.isDone = false;
            this.nextQuizMessage = '';
            this.counter += 1;
          } else {
            this.nextQuizMessage = 'SORRY! THERE IS NO NEXT LEVEL FOR THE MOMENT.';
          }
        } else {
          this.nextQuizMessage = 'YOU HAVE TO GET AT LEAST 50% CORRECT!';
        }
      },
      redoQuiz(){
        this.fetchNextQuiz(this.selectedLevel);
        this.userHasGuessed = false;
        this.countOfCorrectAnswers=0;
        this.questionNumber= 0;
        this.isDone =false;
        this.nextQuizMessage='';
      },
      percentageScore(){
        let amount = this.engQuiz.length;
        let scorePerQuestion = 100/amount;
        this.finalScore = Math.round(this.countOfCorrectAnswers * scorePerQuestion);
      },
      getImgUrl: function (pic) {
        return require('../assets/' + pic)
      },
      fetchNextQuiz(level){
        fetch('http://127.0.0.1:3000/api/engQuiz/level/'+level)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.engQuiz);
            this.engQuiz = data.engQuiz;
          });
      },
      async addMyRates() {
        if (sessionStorage.getItem('userLogged') === null) {
          this.rateMessage='Please login to add feedback!'
        }else {
          let response = await ApiServices.addRates({
            starNumber: this.rateValue,
            text: this.textArea,
            subject: 'English',
            subjectLevel: this.selectedLevel,
            userId: parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId)
          });
          this.rateMessage= response.data.message;
          await this.getRates();
        }
      },
      async addScores() {
        if (JSON.parse(sessionStorage.getItem('userLogged')).userId && this.isDone === true ){
          let checkScoreId = await ApiServices.checkScoresIfIsExist({
            subject: 'English',
            subjectLevel: this.selectedLevel,
            userId: parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId)
          });
          if (!checkScoreId.data.isExist){
            await ApiServices.addScore({
              subject: 'English',
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
            subject: 'English',
            subjectLevel: this.selectedLevel
          });
          this.engScores= response.data.scores;
        }
      },
      scoresTable(){
        const table = document.getElementById('userTable')
        let i,j;
        const arrItems = this.engScores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
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
      },
      async getRates() {
        let response = await ApiServices.getRateByLevel({
          subject: 'English',
          subjectLevel: this.selectedLevel
        });
        this.engRates = response.data.rates;
        this.ratesTable();
        this.rateValue = 5;
        this.textArea = '';
      },
      ratesTable(){
        $("#rateTable tr").remove();
        const table = document.getElementById('rateTable')
        let i,j;
        let oneCell='';
        const arrItems = this.engRates.reverse();
        const col = []
        let cells = []
        for (i = 0; i < arrItems.length; i++) {
          for (const key in arrItems[i]) {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }
        for (i = 0; i < arrItems.length; i++) {
          let tr = table.insertRow(-1);
          const tabCell = tr.insertCell(-1)
          for (j = 0; j < col.length; j++) {
            cells.push(arrItems[i][col[j]]);
          }
          oneCell = this.convertDataToRate(cells);
          tabCell.innerHTML=oneCell;
          cells = [];
          oneCell='';
        }
      },
      convertDataToRate(arrayRate){
        let newCell= '';
        const starOff = '<img src="https://img.icons8.com/windows/32/000000/filled-star.png" alt="off" width="30" height="30"/>'
        const starOn = '<img src="https://img.icons8.com/color/48/000000/filled-star.png" alt="on" width="30" height="30"/>'
        let amountOff = '';
        let amountOn = '';
        let amount = arrayRate[0];

        for (let i = 0; i < (5 - amount); i++) {amountOff += starOff;}
        for (let j = 0; j < amount; j++) {amountOn += starOn;}
        newCell += amountOn + amountOff + '<br>';
        newCell += '<h5>' +arrayRate[1]+ '</h5>';
        newCell += '<span>' +arrayRate[2]+ '</span>';
        return newCell;
      },
    },
    async mounted () {
      let response = await ApiServices.getEngQuizLevel();
      this.levelsNum = response.data.levels;
      for (let i=0;i<this.levelsNum.length;i++){
        this.quizLevel.push(this.levelsNum[i].quizLevel)
      }
      this.quizLevel.sort((a, b) => parseInt(a) - parseInt(b));
      this.selectedLevel = this.quizLevel[0];
      fetch('http://127.0.0.1:3000/api/engQuiz/level/' + this.selectedLevel)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.engQuiz);
          this.engQuiz = data.engQuiz;
        });
    }
  }
</script>


<style scoped>
    .questionInput {
        padding: 10px;
        margin-right: 5px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
        background: rgba(5, 5, 5, 0.5);
        color: wheat;
        font-family: Calibri, monospace;
        font-size: large;
        width: 100%;
        height: 40px;
        cursor: pointer;
    }
    .q-question {
        color: #02b3b3;
        text-align: center;
    }
    .q-result{
        color: #02b3b3;
        text-align: center;
    }

    .q-img {
        margin: 0 auto;
        width: 200px;
        height: 200px;
    }
    img{
        max-width: 100%;
        max-height: 100%;
        display: block;
    }
    h1{
        background: rgba(0, 0, 0, 0.9);
        font-family: "Yu Gothic", monospace;
        font-size: 18px;
        color: wheat;
        border-bottom: 1px solid black;
        margin:auto;
    }
    .q-answer, .q-score, .q-rate {
        text-align: center;
        margin: auto;
    }
    .btn-icon{
        margin: auto;
    }
    .q-btn-black, .q-btn-blue, .q-btn-red, .btn-rate,  .q-btn{
        width: 100%;
        margin-right: 5px;
        margin-top: 5px;
        margin-bottom: 10px;
        font-family: Calibri, monospace;
        font-size: large;
        color: #c4c2c2;
        height: 40px;
        border: none;
        border-radius: 4px;
        text-align: center;
    }
    .q-btn-black{
        background-color: rgba(84, 112, 33, 0.62);
    }
    .q-btn-blue{
        background-color: rgba(65, 105, 225, 0.99);
    }
    .q-btn-red{
        background-color: rgba(205, 92, 92, 0.98);
    }
    .btn-rate{
        background-color: rgba(0, 128, 0, 0.98);
    }
    .btn-rate:hover{
        background-color: green;
        border: 1px solid wheat;
        color: wheat;
    }
    .q-btn-black:hover{
        background-color: #547021;
        border: 1px solid wheat;
        color: wheat;
    }
    .q-btn-blue:hover{
        background-color: royalblue;
        border: 1px solid wheat;
        color: wheat;
    }
    .q-btn-red:hover{
        background-color: indianred;
        border: 1px solid wheat;
        color: wheat;
    }
    .q-btn {
        background-color: darkslategrey;
        border: 2px solid black;
    }
    .q-btn:hover {
        background-color: darkgoldenrod;
        border: 2px solid wheat;
        color: black;
        cursor: pointer;
    }
    .about{
        display: table-cell;
        text-align: center;
        vertical-align: top;
        background: rgba(0, 0, 0, 0.7);
    }
    h2{
        font-family: "Yu Gothic", monospace;
        font-size: 17px;
        color: wheat;
        margin: auto;
        border-radius: 4px;
    }
    h3{
        font-family: "Nirmala UI Semilight", monospace;
        font-size: large;
        color: wheat;
    }
    .res{
        margin: 0 auto;
        width:35%;
        height: 35%;
        display: block;
    }
    select, textarea {
        padding: 10px;
        margin-top: 2px;
        margin-bottom: 2px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
        background: rgba(5, 5, 5, 0.5);
        color: wheat;
        font-family: Calibri, monospace;
        width: 100%;
        height: 40px;
        cursor: pointer;
    }
    textarea{
        height: 100px;
    }
    /* Mobile */
    @media screen and (max-width: 400px) {
    }
    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
        .about{
            display: table-cell;
            text-align: center;
            vertical-align: top;
            background: rgba(0, 0, 0, 0.7);
        }
        .q-btn-black, .q-btn-blue, .q-btn-red,.q-btn{
            margin-top: 20px;
            width: 150px;
        }
        .btn-rate{
            width:  150px;
        }
        .questionInput {
            width: 300px;
        }
        h1{
            padding: 13px;
        }
        .finalScore{
            padding: 13px;
            width: 100px;
        }
        .q-result{
            margin: auto;
            width: 60%;
        }

        select, textarea {
            width: 100%;
        }
        .showScoresEng{
            padding: 10px;
        }
        .q-result{
            margin: auto;
            width: 60%;
        }
    }
</style>