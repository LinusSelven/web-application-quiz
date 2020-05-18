<template>
    <div>
        <section class="item3">
            <div class="q-question">
                <h2>{{mattequiz[questionNumber].quizQuestion}}</h2>
            </div>
            <div class="q-img">
                <h2>
                    <img :src="getImgUrl(mattequiz[questionNumber].quizImg)" v-bind:alt="pic">
                </h2>
            </div>
            <div class="q-answer">
                <button class="q-btn" @click="userChoseAnswer($event) " :disabled="userHasGuessed" value="1">{{mattequiz[questionNumber].quizAnswer1}}
                </button>
                <button class="q-btn" @click="userChoseAnswer($event)" :disabled="userHasGuessed" value="2">{{mattequiz[questionNumber].quizAnswer2}}
                </button>
                <button class="q-btn" @click="userChoseAnswer($event)" :disabled="userHasGuessed" value="3">{{mattequiz [questionNumber].quizAnswer3}}
                </button>
            </div>
            <div class="q-question">
                <h3 v-if="correctAnswer">Rätt svar!</h3>
                <button class="q-btn" @click="nextQuestion()">Nästa fråga</button>
                <h3>{{correctAnswers}} / {{mattequiz.length}}</h3>
            </div>
        </section>

    </div>
</template>

<script>
    export default {
        name: "mattequiz",
        data: function () {
            return {
                mattequiz: [],
                questionNumber: 0,
                correctAnswer: false,
                correctAnswers: 0,
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
                this.userHasGuessed = true
                if (e.target.value == this.mattequiz[this.questionNumber].quizCorrectAnswer) {
                    this.correctAnswers += 1;
                    return this.correctAnswer = true;
                }
            },


            getImgUrl: function (pic) {
                return require('../assets/' + pic)
            }
        },

        mounted() {
            fetch('http://127.0.0.1:3000/api/mattequiz/')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.mattequiz);
                    this.mattequiz = data.mattequiz;
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
        width: 150px;
        height: 150px;
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