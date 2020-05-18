<template>
    <div>
        <section class="item3">
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
                <h3 v-if="correctAnswer">Rätt svar!</h3>
                <button class="q-btn" @click="nextQuestion()">Nästa fråga</button>
                <h3>{{countOfCorrectAnswers}} / {{quiz.length}}</h3>
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
                if (e.target.value == this.quiz[this.questionNumber].quizCorrectAnswer) {
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