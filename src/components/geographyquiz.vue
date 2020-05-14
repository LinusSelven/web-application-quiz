<template>
    <div>
        <section class="item3">
            <div class="q-question">
                <h2>{{quiz[questionNumber].quizQuestion}}</h2>
            </div>
            <div class="q-img">
                <h2>
                    <img :src="getPic(questionNumber)" :alt="quiz[questionNumber].quizImg">
                </h2>
            </div>
            <div class="q-answer">
                <button class="q-btn" @click="isCorrectAnswer($event)" value="1">{{quiz[questionNumber].quizAnswer1}}
                </button>
                <button class="q-btn" @click="isCorrectAnswer($event)" value="2">{{quiz[questionNumber].quizAnswer2}}
                </button>
                <button class="q-btn" @click="isCorrectAnswer($event)" value="3">{{quiz[questionNumber].quizAnswer3}}
                </button>
            </div>
            <div class="q-question">
                <h3 v-if="correctAnswer">Rätt svar!</h3>
                <button class="q-btn" @click="nextQuestion()">Nästa fråga</button>
                <h3>{{correctAnswers}} / {{quiz.length}}</h3>
            </div>
        </section>

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
                correctAnswers: 0
            }
        },

        methods: {

            nextQuestion: function () {
                this.correctAnswer = false;
                return this.questionNumber += 1;
            },

            isCorrectAnswer: function (e) {
                if (e.target.value == this.quiz[this.questionNumber].quizCorrectAnswer){
                    this.correctAnswers += 1;
                    return this.correctAnswer = true;
<<<<<<< HEAD
            },
            getPic(index) {
                return '../assets/img'+index+'.png';
=======
                }
>>>>>>> master
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

    .item3 {
        padding: 10px 5px 10px 5px;
        grid-area: sidebar;
    }

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
        width: 10%;
        background-color: #333333;
        font-size: 20px;
        color: #02b3b3;
        height: 50px;
    }

</style>