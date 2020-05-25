<template>
    <div class="createQuiz">
    <p id="validation">{{validation}}</p>
    <article>
        <div v-show="!isSelected">
            <select id="subject" name="subject" @change="onChange($event)" v-model="value">
                <option value="default">Select The Subject</option>
                <option value="geoQuiz">Geografi</option>
                <option value="matteQuiz">Matematik</option>
                <option value="svenskaQuiz">Svenska</option>
                <option value="engelskaQuiz">Engelska</option>
            </select>
            <input type="number" id="amount" name="amount" placeholder="Amount of question*" v-model="amount">
            <input type="submit" value="Next" @click="infoQuiz()">
        </div>
        <div v-show="isSelected" v-if="count !==amount">

            <input type="text" id="question" name="question" placeholder="The Question*" v-model="quizQuestion">
            <input type="text" id="answer1" name="answer1" placeholder="Answer 1*" v-model="quizAnswer1">
            <input type="text" id="answer2" name="answer2" placeholder="answer 2*" v-model="quizAnswer2">
            <input type="text" id="answer3" name="answer3" placeholder="answer 3*" v-model="quizAnswer3">
            <select id="correctAnswer" name="correctAnswer" @change="onChangeAnswers($event)" v-model="quizCorrectAnswer">
                <option value="0">Select The correct answer</option>
                <option value="1">Answer 1</option>
                <option value="2">answer 2</option>
                <option value="3">answer 3</option>
            </select><br>
            <input type="file" id="upload" name="upload" accept="image/*" placeholder="Select image">
            <input type="submit" value="Save" @submit="postNewQuiz">
        </div>
        <div v-if="count===amount" v-show="isSelected">
            <input type="submit" value="Back" @submit="goBack">
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
        quizCorrectAnswer: 0,
        value:'default',
        amount:'Amount of question*',
        validation:'',
        count:1,
      }

    },
    methods: {
      onChange (event) {
        this.value = event.target.value;
      },
      onChangeAnswers(event){
        this.quizCorrectAnswer = parseInt(event.target.value);
      },
      emptyFields(){
        this.quizQuestion ='';
        this.quizAnswer1 ='';
        this.quizAnswer2 ='';
        this.quizAnswer3 ='';
        this.quizCorrectAnswer= 0;
      },
      infoQuiz(){
        if (this.value !== 'default' && this.amount > 0){
          this.isSelected=true;
          this.validation='';
        }else {
          this.validation='Please select a subject and enter amount of question!'
        }
      },
      goBack(){
        this.emptyFields();
        this.isSelected=false;
        this.count = 1;
      },
      async postNewQuiz(){
              for(let i =0; i<this.amount; i++){
                    let response
                    const credential = 'quizQuestion: this.quizQuestion,\n' +
                                       'quizAnswer1: this.quizAnswer1,\n' +
                                       'quizAnswer2: this.quizAnswer2,\n' +
                                       'quizAnswer3: this.quizAnswer3,\n' +
                                       'quizCorrectAnswer: this.quizCorrectAnswer';
                    if (this.value ==='geoQuiz'){
                      response = await ApiServices.newQuizGeo({
                        credential
                      });
                    }else if (this.value ==='matteQuiz'){
                       response = await ApiServices.newQuizMat({
                        credential
                      });
                    }else if (this.value ==='engelskaQuiz'){
                       response = await ApiServices.newQuizEng({
                        credential
                      });
                    }else if (this.value ==='svenskaQuiz'){
                       response = await ApiServices.newQuizSve({
                        credential
                      });
                    }
                    console.log(response);
                this.emptyFields();
                this.count += 1;
              }
      },

    }

  }
</script>

<style scoped>
    input[type=text], input[type=email], input[type=password], input[type=checkbox], input[type=number],input[type=file], select,textarea, label {
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
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            background: rgba(0, 0, 0, 0.7);
        }
        input[type=text], input[type=email],input[type=submit], input[type=password],input[type=number], input[type=file],select, textarea, label {
            background: rgba(5, 5, 5, 0.5);
            width: 90%;
        }
        label{
            border: none;
            background: none;
        }
    }
</style>