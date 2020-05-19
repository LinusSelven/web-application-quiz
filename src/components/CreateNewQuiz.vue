<template>
    <div class="createQuiz">
    <p>{{registrationStatus}}</p>
    <p id="validation">{{validation}}</p>
    <article>
        <div v-show="!isSelected">
            <select id="subject" name="subject" @change="onChange($event)" v-model="value">
                <option value="default">Select The Subject</option>
                <option value="geoQuiz">Geografi</option>
                <option value="mattequiz">Matematik</option>
                <option value="svenskaQuiz">Svenska</option>
                <option value="engelskaQuiz">Engelska</option>
            </select>
            <input type="number" id="amount" name="amount" placeholder="Amount of question*" v-model="amount">
            <input type="submit" value="Next" @click="infoQuiz()">
        </div>
        <div v-show="isSelected">

            <input type="text" id="question" name="question" placeholder="The Question*" v-model="quizQuestion">
            <input type="text" id="answer1" name="answer1" placeholder="Answer 1*" v-model="quizAnswer1">
            <input type="text" id="answer2" name="answer2" placeholder="answer 2*" v-model="quizAnswer2">
            <input type="text" id="answer3" name="answer3" placeholder="answer 3*" v-model="quizAnswer3">
            <input type="text" id="correctAnswer" name="correctAnswer" placeholder="Correct answer*" v-model="quizCorrectAnswer">
            <label for="img">Select image:</label>
            <input type="file" id="img" name="img" accept="image/*">
            <input type="submit" value="Save" @submit="postNewQuiz">
        </div>

    </article>
</div>
    
</template>

<script>
  import ApiServices from '../services/ApiServices'

  export default {
    name: 'CreateNewQuiz',
    data: function () {
      return{
        isSelected:false,
        quizQuestion: '',
        quizAnswer1 :'',
        quizAnswer2 :'',
        quizAnswer3 :'',
        quizCorrectAnswer: '',
        value:'',
        amount:0,
      }

    },
    methods: {
      onChange (event) {
        this.value = event.target.value;
      },
      emptyFields(){
        this.quizQuestion ='';
        this.quizAnswer1 ='';
        this.quizAnswer2 ='';
        this.quizAnswer3 ='';
        this.quizCorrectAnswer= '';
      },
      infoQuiz(){
        this.isSelected=true;
      },
      getNewQuizRows(){
        for(let i =0; i<this.amount; i++){
          this.newQuiz.push(this.quizQuestion, this.quizAnswer1, this.quizAnswer2, this.quizAnswer3, this.quizCorrectAnswer);
          this.emptyFields();
        }
      },

        async postNewQuiz(){
          for(let i =0; i<this.amount; i++){
            const response = await ApiServices.newQuiz({
              quizQuestion: this.quizQuestion,
              quizAnswer1: this.quizAnswer1,
              quizAnswer2: this.quizAnswer2,
              quizAnswer3: this.quizAnswer3,
              quizCorrectAnswer: this.quizCorrectAnswer
            });
            console.log(response);
          }
            this.emptyFields();
          }

      }

  }
</script>

<style scoped>
    input[type=text], input[type=email], input[type=password], input[type=checkbox], input[type=number],select, label {
        padding: 10px;
        margin-top: 2px;
        margin-bottom: 2px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
        background: rgba(5, 5, 5, 0.9);
        color: wheat;
        font-family: Calibri, monospace;
        font-weight: bold;
        width: 100%;
        height: 40px;
        cursor: pointer;
    }
    p{
        font-family: Calibri, monospace;
        font-weight: bolder;
        color: #1b9b52;
    }
    #validation{
        font-family: Calibri, monospace;
        font-weight: normal;
        color: #f60334;
    }
    .vl {
        border-left: 2px solid dimgray;
        height: 100%;
    }
    input[type=checkbox]{
        height: auto;
        width: auto;
    }
    input[type=submit] {
        margin-top: 2px;
        margin-bottom: 2px;
        background-color: #333333;
        font-family: Calibri, monospace;
        font-weight: bold;
        color: #02b3b3;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        width: 100%;
        height: 40px;
        cursor: pointer;
    }

    input[type=submit]:hover {
        background-color: #e9e608;
        color: black;
    }

    .createQuiz {
        display: inline-block;
        width: 100%;
    }
    span{
        font-family: Calibri, monospace;
        font-weight: normal;
        color: wheat;
    }
    ::-webkit-input-placeholder { /* Edge */
        color: #fced62;
    }

    :-ms-input-placeholder { /* Internet Explorer */
        color: #fced62;
    }

    ::placeholder {
        color: wheat;
    }
    /* Mobile */
    @media screen and (max-width: 400px) {

    }
    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {

    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
        .createQuiz {
            border: 1px solid #02b3b3;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px;
            width: 60%;
        }
        input[type=text], input[type=email], input[type=password], select, textarea, label {
            padding: 10px;
            margin-top: 2px;
            margin-bottom: 2px;
            border: 1px solid rgb(7, 172, 172);
            border-radius: 4px;
            box-sizing: border-box;
            resize: vertical;
            background: rgba(5, 5, 5, 0.5);
            color: wheat;
            font-family: Calibri, monospace;
            font-weight: bold;
            width: 100%;
            height: 40px;
        }
        label{
            border: none;
            background: none;
        }
    }
</style>