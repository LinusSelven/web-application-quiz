<template>
    <div class="about">
        <div v-if="!isDone" class="q-question">
            <h1>Quiz Level: {{selectedLevel}} / {{quizLevel.length}}   |    Question: {{questionNumber+1}}/{{engQuiz.length}}</h1>
            <div>
                <h2>{{engQuiz[questionNumber].quizQuestion}}</h2>
            </div>
            <div class="q-img">

                    <img :src="getImgUrl(engQuiz[questionNumber].quizImg)" v-bind:alt="pic">

            </div>
            <div class="q-answer">

         <!--       <p> {{engQuiz[questionNumber].quizAnswer1}}</p>   -->
                <p></p>
                <input value="" type="text"  placeholder="Skriv med små bokstäver "  id="answer"  >
                <p></p>
                <button class="q-btn" @click="userChoseAnswer() " :disabled="userHasGuessed" value="1">Check the answer
                </button>


            </div>
        </div>
        <div v-if="isDone" class="q-question">
            <img src="../assets/result1.png" alt="res" class="res">
            <h1>{{finalScore}} %</h1>
            <button class="q-btn" @click="nextLevelQuiz">Next Quiz</button>
            <button class="q-btn" @click="redoQuiz">Last Quiz</button>
            <h2>{{nextQuizMessage}}</h2>
        </div>
    </div>
</template>

<script>
  export default {
    name: "engQuiz",
    data: function () {
      return {
        engQuiz: [],
        quizLevel:[],
        questionNumber: 0,
        countOfCorrectAnswers: 0,
        userHasGuessed: false,
        selectedLevel : 1, /* default */
        isDone:false,
        finalScore:0,
        nextQuizMessage:'',
        numberOfLevel:0,
        answer:""
      }
    },

    methods: {
      nextQuestion() {
        this.userHasGuessed = false;
      },
      userChoseAnswer: function () {
        this.userHasGuessed = true;
        this.answer = document.getElementById("answer").value;
        if ((this.answer)==(this.engQuiz[this.questionNumber].quizCorrectAnswer)){
          this.countOfCorrectAnswers += 1;

        }
        document.getElementById("answer").value="";
        this.nextQuestion();
        this.countQuestions();
        this.percentageScore();
      },

      countQuestions(){
        this.questionNumber += 1;
        this.isDone = this.questionNumber === this.engQuiz.length;
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
    },
    mounted() {

      fetch('http://127.0.0.1:3000/api/engQuiz/numberOfLevel')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.quizLevel = data.engQuizLevel;
        });
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
    .q-question {
        color: #02b3b3;
    }

    .q-img {
        margin: 0 auto;
        width: 200px;
        height: 160px;
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
        margin: 0;
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
        display: inline-block;
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
        width: 300px;
        height: 220px;
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
            background: rgba(0, 0, 0, 0.8);
        }
        .q-btn {
            margin-top: 20px;
            width: 32%;
            height: 50px;
        }
        h1{
            padding: 13px;
        }
    }


</style>