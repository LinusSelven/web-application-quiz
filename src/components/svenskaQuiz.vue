<template>
    <div class="svenskaquiz">
        <h1>HELLO</h1>
        <div class="q-question">
            <div class="q-answer">
                <div class="part"><p>{{svenskaQuiz[0].quizPart1}}</p></div>
                <div class="empty">DRAG SPACE</div>
                <div class="part"><p>{{svenskaQuiz[0].quizPart2}}</p></div>
                <div class="empty">DRAG SPACE</div>
                <div class="part"><p>{{svenskaQuiz[0].quizPart3}}</p></div>
                <div class="empty">DRAG SPACE</div>
                <div class="part"><p>{{svenskaQuiz[0].quizEnd}}</p></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "svenskaQuiz",
        data: function () {
            return {
                svenskaQuiz: [{
                    "quizId": 1, "quizPart1": "Jag ", "quizPart2": "ut, för att ", "quizPart3": "till min ",
                    "quizEnd": ".", "quizAnswer1": "gick", "quizAnswer2": "handla", "quizAnswer3": "mormor"
                }],
                questionNumber: 0,
                countOfCorrectAnswers: 0,
                userHasGuessed: false,
                key: '0',
                resultat: '',
            }
        },

        methods: {
            nextQuestion: function () {
                this.userHasGuessed = false;
                this.resultat = '';
                this.key = '0';
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

    .svenskaquiz{
        background: rgba(0, 0, 0, .7);
        border-radius: 10px;
        display: inline-block;
        text-align: center;
        width: 100%;
    }

    .q-question {
        display: table;
        width: 100%;
        border: 1px solid black;
        border-right: none;
        box-sizing: border-box;
    }
    .q-question > .q-answer {
        display: table-row;
        background-color: green;
    }

    .q-question > .q-answer > .empty {
        background: white;
        border-right: 1px solid black;
        display: table-cell;
        text-align: center;
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