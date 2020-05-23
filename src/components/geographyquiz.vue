<template>
    <div class="quiz-Geo">
            <div class="q-question">
                <h2>{{geoQuiz[questionNumber].quizQuestion}}</h2>
            </div>
            <div class="q-img">
                <h2>
                    <img :src="getImgUrl(geoQuiz[questionNumber].quizImg)" v-bind:alt="pic">
                </h2>
            </div>
            <div class="q-answer">
                <button class="q-btn" @click="userChoseAnswer($event) " :disabled="userHasGuessed" value="1">{{geoQuiz[questionNumber].quizAnswer1}}
                </button>
                <button class="q-btn" @click="userChoseAnswer($event)" :disabled="userHasGuessed" value="2">{{geoQuiz[questionNumber].quizAnswer2}}
                </button>
                <button class="q-btn" @click="userChoseAnswer($event)" :disabled="userHasGuessed" value="3">{{geoQuiz[questionNumber].quizAnswer3}}
                </button>
            </div>
            <div class="q-question">
                <h3 class="right-answer">{{resultat}}</h3>
                <p></p>
                <button class="q-btn" @click="nextQuestion()" v-show="questionNumber !== (geoQuiz.length-1)">Nästa fråga</button>
                <router-link to="/results"><button class="q-btn" v-show="questionNumber === (geoQuiz.length-1)">Resultat</button></router-link>
                <h3>Your score: {{countOfCorrectAnswers}} / {{geoQuiz.length}}</h3>
            </div>
    </div>
</template>

<script>
    export default {
        name: "geographyquiz",
        data: function () {
            return {
                geoQuiz: [],
                questionNumber: 0,
                countOfCorrectAnswers: 0,
                userHasGuessed: false,
                key:'0',
                resultat:'',
            }
        },

        methods: {
            nextQuestion: function () {
                this.userHasGuessed = false;
                this.resultat = '';
                this.key='0';
               this.questionNumber += 1;
            },


            userChoseAnswer: function (event) {
                this.userHasGuessed = true;
                if (event.target.value == this.geoQuiz[this.questionNumber].quizCorrectAnswer) {
                    this.countOfCorrectAnswers += 1;
                    return this.resultat = 'Rätt svar!';
                } else {
                  return this.resultat = 'Fel svar!';
                }
            },


            getImgUrl: function (pic) {
                return require('../assets/' + pic)
            }
        },

        mounted() {
            fetch('http://127.0.0.1:3000/api/geoQuiz/')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.geoQuiz);
                    this.geoQuiz = data.geoQuiz;
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
        width: 200px;
        height: 200px;
    }
    img{
        max-width: 100%;
        max-height: 100%;
        display: block;
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
        .quiz-Geo{
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