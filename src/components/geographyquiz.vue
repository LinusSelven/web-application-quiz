<template>
    <div>
        <section class="item3">
            <div class="q-question">
                <h2>{{quiz[0].quizQuestion}}</h2>
            </div>
            <div class="q-img">
                <h2>
                        {{quiz[0].quizImg}}
                </h2>
            </div>
            <div class="q-answer">
                <button class="q-btn" @click="isCorrectAnswer($event)" value="1">{{quiz[0].quizAnswer1}}</button>
                <button class="q-btn" @click="isCorrectAnswer($event)" value="2">{{quiz[0].quizAnswer2}}</button>
                <button class="q-btn" @click="isCorrectAnswer($event)" value="3">{{quiz[0].quizAnswer3}}</button>
            </div>
            <div class="q-question">
                <h3 v-if="correctAnswer">Rätt svar!</h3>
                <button class="q-btn">Nästa fråga</button>
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
                correctAnswer: false,
            }
        },

        methods: {

            isCorrectAnswer: function(e){
                    if(e.target.value == this.quiz[0].quizCorrectAnswer)
                        return this.correctAnswer = true;
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