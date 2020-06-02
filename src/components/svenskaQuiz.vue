<template>

    <div class="svenskaquiz">
        <h2>Placera ordet i rätt plats</h2>

        <div class="q-question">

            <div class="q-words-box" id="box-0" @dragover.prevent @drop.prevent="drop">
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
            <button class="q-btn" @click="nextQuestion()" >Nästa fråga
            </button>
        </div>
        <h2>{{countOfCorrectAnswers}} / {{svenskaQuiz.length * 3}}</h2>
    </div>
</template>


<script>
  export default {
    name: 'svenskaQuiz',
    data: function () {
      return {
        svenskaQuiz: [],
        questionNumber: 0,
        countOfCorrectAnswers: 0,
        selectedLevel : 1, /* default */
        userHasGuessed: false,
        key: '0',
        resultat: ''
      }
    },

    methods: {
      nextQuestion: function () {
        this.userHasGuessed = false
        this.resultat = ''
        this.key = '0'
        this.questionNumber += 1
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
        switch(selectedBox) {
          case '1':
            if(selectedAnswer == this.svenskaQuiz[this.questionNumber].quizCorrectPos1)
              this.countOfCorrectAnswers += 1;
            break;
          case '2':
            if(selectedAnswer == this.svenskaQuiz[this.questionNumber].quizCorrectPos2)
              this.countOfCorrectAnswers += 1;
            break;
          case '3':
            if(selectedAnswer == this.svenskaQuiz[this.questionNumber].quizCorrectPos3)
              this.countOfCorrectAnswers += 1;
            break;
            default:
              break;
        }
      }
    },

    mounted () {
      fetch('http://127.0.0.1:3000/api/svenskaquiz/')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data.svenskaQuiz)
          this.svenskaQuiz = data.svenskaQuiz
        })
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
        display: inline-block;
        text-align: center;
        width: 100%;
        height: 100%;
    }

    .q-question {
        margin: 0 auto;
        display: table;
        width:70%;
        border-right: none;
        box-sizing: border-box;
    }

    .q-words-box {
        padding-top: 50px;
        padding-bottom: 50px;

    }

    .q-words-box p {
        background: #f3f3f3;
        display: inline;
        padding: 1em;
        margin: 1em;
    }

    .q-question > .q-answer {
        display: inline-table;
        background-color: #cccccc;
        text-align: center;
        width: 100%;
    }

    .q-question > .q-answer > .empty {
        background: white;
        border: 1px solid black;
        display: table-cell;
        text-align: center;
        width: 10%;
    }

    .q-img {
        margin: 0 auto;
        width: 200px;
        height: 200px;
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

    /* Mobile */
    @media screen and (max-width: 400px) {
    }

    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    }

    /* Desktop */
    @media screen and (min-width: 1025px) {
        .about {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            background: rgba(0, 0, 0, 0.7);
        }

        .q-btn {
            width: 30%;
            height: 50px;
        }
    }


</style>