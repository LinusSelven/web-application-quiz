<template>
    <div class="quiz-Geo">
            <div class="q-question">
                <h2>{{quiz[questionNumber].quizQuestion}}</h2>
            </div>
            <div class="q-img">
                <h2>
                    <img :src="getImgUrl(quiz[questionNumber].quizImg)" v-bind:alt="pic">
                </h2>
            </div>
            <div class="q-answer">
                <button class="q-btn" @click="userChoseAnswer($event) " :disabled="userHasGuessed" value="1">{{quiz[questionNumber].quizAnswer1}}
                </button>
                <button class="q-btn" @click="userChoseAnswer($event)" :disabled="userHasGuessed" value="2">{{quiz[questionNumber].quizAnswer2}}
                </button>
                <button class="q-btn" @click="userChoseAnswer($event)" :disabled="userHasGuessed" value="3">{{quiz[questionNumber].quizAnswer3}}
                </button>
            </div>
            <div class="q-question">
                <h3 class="right-answer" v-if="correctAnswer">Rätt svar!</h3>
                <p></p>
                <button class="q-btn" @click="nextQuestion()">Nästa fråga</button>
                <h3>{{countOfCorrectAnswers}} / {{quiz.length}}</h3>
            </div>
    </div>
</template>

<script>
    export default {
        name: "geographyquiz",
        data: function () {
            return {
                quiz: [],
                questionNumber: 0,
                correctAnswer: false,
                countOfCorrectAnswers: 0,
                userHasGuessed: false
            }
        },

        methods: {

            nextQuestion: function () {
                this.userHasGuessed = false;
                this.correctAnswer = false;
                return this.questionNumber += 1;
            },


            userChoseAnswer: function (e) {
                this.userHasGuessed = true;
                if (e.target.value === this.quiz[this.questionNumber].quizCorrectAnswer) {
                    this.countOfCorrectAnswers += 1;
                    return this.correctAnswer = true;
                }
            },


            getImgUrl: function (pic) {
                return require('../assets/' + pic)
            }
        },

        mounted() {
            fetch('http://127.0.0.1:3000/api/quiz/')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.quiz);
                    this.quiz = data.quiz;
                });
        }

    }
</script>


<style scoped>
    .q-question {
        color: #02b3b3;
    }

    .q-img {
        margin: 0 auto;
        width: 250px;
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
    .quiz-Geo{
        background: rgba(0, 0, 0, .7);
        border-radius: 10px;
        display: inline-block;
        text-align: center;
        width: 100%;
    }
    p{
        margin-bottom: 20px;
    }
    h2, h3{
        font-family: "Times New Roman", monospace;
        color: wheat;
    }
    .right-answer{
        color: #1b9b52;
    }
    /* Mobile */
    @media screen and (max-width: 400px) {
    }
    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
        .quiz-Geo{
            border: 1px solid #02b3b3;
            border-radius: 10px;
            background: rgba(0, 0, 0, .6);
            padding: 10px;
            width: 60%;
        }
        .q-btn {
            width: 30%;
            height: 50px;
        }
    }


</style>