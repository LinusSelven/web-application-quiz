<template>
    <div class="about">
        <div v-if="!isDone" class="q-question">
            <h1>Quiz Level: {{selectedLevel}} / {{quizLevel.length}}   |    Question: {{questionNumber+1}}/{{matteQuiz.length}}</h1>
            <div>
                <h2>{{matteQuiz[questionNumber].quizQuestion}}</h2>
            </div>
            <div class="q-img">
                <h2>
                    <img :src="getImgUrl(matteQuiz[questionNumber].quizImg)" v-bind:alt="pic">
                </h2>
            </div>
            <div class="q-answer">
                <button class="q-btn" @click="userChoseAnswer($event) " :disabled="userHasGuessed" value="1">{{matteQuiz[questionNumber].quizAnswer1}}
                </button>
                <button class="q-btn" @click="userChoseAnswer($event)" :disabled="userHasGuessed" value="2">{{matteQuiz[questionNumber].quizAnswer2}}
                </button>
                <button class="q-btn" @click="userChoseAnswer($event)" :disabled="userHasGuessed" value="3">{{matteQuiz[questionNumber].quizAnswer3}}
                </button>
            </div>
        </div>
        <div v-if="isDone" class="q-result">
            <button class="q-btn" @click="nextLevelQuiz">Next Quiz</button>
            <button class="q-btn" @click="redoQuiz">Last Quiz</button>
            <h2>{{nextQuizMessage}}</h2>
            <img src="../assets/result1.png" alt="res" class="res">
            <h1 class="finalScore">{{finalScore}} %</h1>
            <p class="showScoresMatte" id="showScoresMatte"></p>
        </div>
    </div>
</template>

<script>
  import ApiServices from '../services/ApiServices'

  export default {
    name: "mattequiz",
    data: function () {
      return {
        matteQuiz: [],
        quizLevel:[],
        matteScores:[],
        questionNumber: 0,
        countOfCorrectAnswers: 0,
        userHasGuessed: false,
        selectedLevel : 1, /* default */
        isDone:false,
        finalScore:0,
        nextQuizMessage:'',
        numberOfLevel:0,
      }
    },

    methods: {
      nextQuestion() {
        this.userHasGuessed = false;
      },
      userChoseAnswer: function (event) {
        this.userHasGuessed = true;
        if (parseInt(event.target.value) === this.matteQuiz[this.questionNumber].quizCorrectAnswer) {
          this.countOfCorrectAnswers += 1;
        }
        this.nextQuestion();
        this.countQuestions();
        this.percentageScore();
      },

      async countQuestions () {
        this.questionNumber += 1;
        if (this.questionNumber === this.matteQuiz.length) {
          this.isDone = true;
          await this.addScores();
          await this.getScores();
          this.createGeoScoresTable();
        }
      },
      nextLevelQuiz(){
        if(this.finalScore >= 50){
          if (this.selectedLevel<this.quizLevel.length ){
            this.selectedLevel +=1 ;
            this.fetchNextQuiz(this.selectedLevel);
            this.userHasGuessed = false;
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
        this.userHasGuessed = false;
        this.countOfCorrectAnswers=0;
        this.questionNumber= 0;
        this.isDone =false;
        this.nextQuizMessage='';
      },
      percentageScore(){
        let amount = this.matteQuiz.length;
        let scorePerQuestion = 100/amount;
        this.finalScore = Math.round(this.countOfCorrectAnswers * scorePerQuestion);
      },
      getImgUrl: function (pic) {
        return require('../assets/' + pic)
      },
      fetchNextQuiz(level){
        fetch('http://127.0.0.1:3000/api/matteQuiz/level/'+level)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.matteQuiz);
            this.matteQuiz = data.matteQuiz;
          });
      },
      async addScores() {
        if (JSON.parse(sessionStorage.getItem('userLogged')).userId && this.isDone === true ){
          let checkScoreId = await ApiServices.checkScoresIfIsExist({
            subject: 'Mathematics',
            subjectLevel: this.selectedLevel,
            userId: parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId)
          });
          if (!checkScoreId.data.isExist){
            await ApiServices.addScore({
              subject: 'Mathematics',
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
            subject: 'Mathematics',
            subjectLevel: this.selectedLevel
          });
          this.matteScores= response.data.scores;
        }
      },
      createGeoScoresTable() {
        const table = document.createElement('table')
        table.className = "userTable";
        let i,j;
        const arrItems = this.matteScores.sort(function(a, b) {
          return parseFloat(b.score) - parseFloat(a.score);
        });
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
        const divContainer = document.getElementById('showScoresMatte')
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
      },
    },
    mounted() {

      fetch('http://127.0.0.1:3000/api/matteQuiz/numberOfLevel')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.quizLevel = data.matteQuizLevel;
        });
      fetch('http://127.0.0.1:3000/api/matteQuiz/level/' + this.selectedLevel)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.matteQuiz);
          this.matteQuiz = data.matteQuiz;
        });
    }
  }
</script>


<style scoped>
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
        font-family: "Nirmala UI Semilight", monospace;
        font-size: x-large;
        color: wheat;
        border-bottom: 1px solid black;
        margin:auto;
    }

    .q-answer {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .q-btn {
        width: 100%;
        margin-right: 5px;
        margin-top: 5px;
        background-color: #333333;
        font-family: "Times New Roman", monospace;
        font-size: 20px;
        color: wheat;
        height: 30px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
    }
    .q-btn:hover {
        background-color: #e9e608;
        color: black;
        cursor: pointer;
    }
    .about{
        background: rgba(0, 0, 0, .7);
        display: table-cell;
        text-align: center;
        width: 100%;
    }
    h2, h3{
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
        .q-btn {
            margin-top: 20px;
            width: 32%;
            height: 50px;
        }
        h1{
            padding: 13px;
        }
        .finalScore{
            padding: 13px;
            width: 100px;
        }
        .showScoresMatte{
            padding: 10px;
        }
        .q-result{
            margin: auto;
            width: 60%;
        }
    }
</style>