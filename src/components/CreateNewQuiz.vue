<template>
    <div class="createQuiz">
        <h1>SELECT SUBJECT</h1>
        <div class="addQuiz">
            <select id="byQuizLevel" @change="onChangeLevels($event)" v-model="levelValue"></select>
            <select id="subject" name="subject" @change="onChangeSubject($event)" v-model="value">
                <option value="default">Select The Subject</option>
                <option value="Geography">Geografi</option>
                <option value="Mathematics">Matematik</option>
                <option value="Swedish">Svenska</option>
                <option value="English">Engelska</option>
            </select><br>
        </div>
        <h1 v-if="value !== 'default' ">ADD QUIZ</h1>
        <div v-if="value === 'Geography' || value === 'Mathematics'" class="addQuiz">
            <textarea type="text" name="question" placeholder="The Question*" v-model="quizQuestion" required/>
            <input type="number"  name="answer1" placeholder="Quiz Level*" v-model="quizLevel" required min="1"/>
            <input type="text" name="answer1" placeholder="Answer 1*" v-model="quizAnswer1" required>
            <input type="text" name="answer2" placeholder="answer 2*" v-model="quizAnswer2" required>
            <input type="text" name="answer3" placeholder="answer 3*" v-model="quizAnswer3" required>
            <select id="correctAnswer" name="correctAnswer" @change="onChangeAnswers($event)" v-model="quizCorrectAnswer" required>
                <option value="0">Select The correct answer</option>
                <option value="1">Answer 1</option>
                <option value="2">answer 2</option>
                <option value="3">answer 3</option>
            </select><br>
            <input type="file" name="upload" accept="image/*" placeholder="Select image">
            <input type="submit" class="btn-save" value="Save" @click="postNewQuiz">&nbsp;<input class="btn-back" type="submit" value="Back" @click="goBack">
        </div>

        <div v-if="value === 'English'" class="addQuiz">
            <textarea type="text" name="question" placeholder="The Question*" v-model="quizQuestion" required/>
            <input type="number"  name="answer1" placeholder="Quiz Level*" v-model="quizLevel" required min="1"/>
            <input type="text" name="answer2" placeholder="answer 2*" v-model="quizAnswer1" required/>
            <input type="text" name="answer3" placeholder="The correct answer*" v-model="CorrectAnswer" required/>
            <input type="file" name="upload" accept="image/*" placeholder="Select image"/>
            <input type="submit" class="btn-save" value="Save" @click="postNewQuiz">&nbsp;<input class="btn-back" type="submit" value="Back" @click="goBack">
        </div>


        <div v-if="value==='Swedish'" class="addQuiz">
            <input type="number"  name="answer1" placeholder="Quiz Level*" v-model="quizLevel" required min="1"/>
            <input type="text" name="question" placeholder="The Question Part1*" v-model="quizPart1" required/>
            <input type="text" name="question" placeholder="The Question Part2*" v-model="quizPart2" required/>
            <input type="text" name="question" placeholder="The Question Part3*" v-model="quizPart3" required/>
            <input type="text" name="answer1" placeholder="Answer 1*" v-model="quizAnswer1" required>
            <input type="text" name="answer2" placeholder="answer 2*" v-model="quizAnswer2" required>
            <input type="text" name="answer3" placeholder="answer 3*" v-model="quizAnswer3" required>
            <input type="number"  name="answer1" placeholder="Correct Position 1*" v-model="quizCorrectPos1" required min="1" max="3">
            <input type="number" name="answer2" placeholder="Correct Position 2*" v-model="quizCorrectPos2" required min="1" max="3">
            <input type="number" name="answer3" placeholder="Correct Position 3*" v-model="quizCorrectPos3" required min="1" max="3">
            <input type="submit" class="btn-save" value="Save" @click="postNewQuiz()">&nbsp;<input class="btn-back" type="submit" value="Back" @click="goBack">
        </div>


</div>
    
</template>

<script>
  import ApiServices from '../services/ApiServices'
  export default {
    name: 'CreateNewQuiz',
    data: function () {
      return{
        quizLevel:'',
        quizQuestion: '',
        quizAnswer1 :'',
        quizAnswer2 :'',
        quizAnswer3 :'',
        CorrectAnswer:'',
        quizCorrectAnswer: 0,
        image: 'quizo.jpg',
        quizPart1:'',
        quizPart2:'',
        quizPart3:'',
        quizCorrectPos1:'',
        quizCorrectPos2:'',
        quizCorrectPos3:'',
        level:0,
        value:'default',
        levelValue:1,
        levels:[],
        byLevel:[],
      }

    },
    methods: {
      async onChangeSubject(event) {
        this.value = event.target.value;
        if (this.value === 'Geography') {
          this.levels = [];
          this.removeAllOptions();
          await this.getGeoQuiz();
          this.byLevel = [];
          this.getArrayLength();
          this.createOptions();
        } else if (this.value === 'Mathematics') {
          this.levels = [];
          this.removeAllOptions();
          await this.getMatteQuiz();
          this.byLevel = [];
          this.getArrayLength();
          this.createOptions();
        } else if (this.value === 'English') {
          this.levels = [];
          this.removeAllOptions();
          await this.getEngQuiz();
          this.byLevel = [];
          this.getArrayLength();
          this.createOptions();
        } else if (this.value === 'Swedish') {
          this.levels = [];
          this.removeAllOptions();
          await this.getSvenQuiz();
          this.byLevel = [];
          this.getArrayLength();
          this.createOptions();
        }else if (this.value === 'default') {
          this.levels = [];
          this.removeAllOptions();
          this.byLevel = [];
        }
      },
      removeAllOptions: function () {
        const select = document.getElementById('byQuizLevel')
        select.options.length = 0;
      },
      createOptions: function () {
        const sel = document.getElementById('byQuizLevel')
        for (let i = 0; i < this.byLevel.length; i++) {
          const opt = document.createElement('option')
          opt.innerHTML = this.byLevel[i];
          opt.value = this.byLevel[i];
          sel.appendChild(opt);
        }
      },
      getArrayLength () {
        for (let i = 0; i < this.levels.length; i++) {
          this.byLevel.push(this.levels[i].quizLevel);
        }
      },
      onChangeLevels (event) {
        this.levelValue = event.target.value;
      },
      getGeoQuiz: async function () {
        let response = await ApiServices.getGeoQuizLevel();
        this.levels = response.data.levels;
      },
      getMatteQuiz: async function () {
        let response = await ApiServices.getMatteQuizLevel();
        this.levels = response.data.levels;
      },
      getEngQuiz: async function () {
        let response = await ApiServices.getEngQuizLevel();
        this.levels = response.data.levels;
      },
      getSvenQuiz: async function () {
        let response = await ApiServices.getSveQuizLevel();
        this.levels = response.data.levels;
      },


      onChangeAnswers(event){
        this.quizCorrectAnswer = parseInt(event.target.value);
      },
      emptyFields(){
        this.quizLevel='';
        this.quizPart1='';
        this.quizPart2='';
        this.quizPart3='';
        this.quizCorrectPos1='';
        this.quizCorrectPos2='';
        this.quizCorrectPos3='';
        this.quizQuestion ='';
        this.quizAnswer1 ='';
        this.quizAnswer2 ='';
        this.quizAnswer3 ='';
        this.quizCorrectAnswer= 0;
        this.CorrectAnswer='';
      },
      goBack(){
        this.emptyFields();
        this.value= 'default';
        this.levels = [];
        this.removeAllOptions();
        this.byLevel = [];
      },
      async postNewQuiz(){
                    if (this.value ==='Geography' && this.quizQuestion !=='' && this.quizLevel !== 0 && this.quizLevel !== '' && this.quizAnswer1 !== ''&& this.quizAnswer2 !== ''&&  this.quizAnswer3 !== ''&& this.quizCorrectAnswer !==0 ){
                    await ApiServices.newQuizGeo({
                      quizQuestion: this.quizQuestion,
                      quizLevel: this.quizLevel,
                      quizAnswer1: this.quizAnswer1,
                      quizAnswer2: this.quizAnswer2,
                      quizAnswer3: this.quizAnswer3,
                      quizCorrectAnswer: this.quizCorrectAnswer,
                      quizImg: this.image
                    });
                      this.emptyFields();
                    }else if (this.value ==='Mathematics' && this.quizQuestion !=='' && this.quizLevel !== 0 && this.quizLevel !== '' && this.quizAnswer1 !== ''&& this.quizAnswer2 !== ''&&  this.quizAnswer3 !== ''&& this.quizCorrectAnswer !==0){
                       await ApiServices.newQuizMat({
                         quizQuestion: this.quizQuestion,
                         quizLevel: this.quizLevel,
                         quizAnswer1: this.quizAnswer1,
                         quizAnswer2: this.quizAnswer2,
                         quizAnswer3: this.quizAnswer3,
                         quizCorrectAnswer: this.quizCorrectAnswer,
                         quizImg: this.image
                      });
                      this.emptyFields();
                    }else if (this.value ==='English' && this.quizQuestion !=='' && this.quizLevel !== 0 && this.quizLevel !== '' && this.quizAnswer1 !== '' && this.CorrectAnswer !==''){
                       await ApiServices.newQuizEng({
                         quizQuestion: this.quizQuestion,
                         quizLevel: this.quizLevel,
                         quizAnswer1: this.quizAnswer1,
                         quizCorrectAnswer: this.CorrectAnswer,
                         quizImg: this.image
                      });
                      this.emptyFields();
                    }else if (this.value ==='Swedish' && this.quizLevel !== 0 && this.quizLevel !== '' && this.quizPart1 !=='' && this.quizPart2 !=='' && this.quizPart3 !=='' && this.quizAnswer1 !== ''&& this.quizAnswer2 !== ''&&  this.quizAnswer3 !== ''&& this.quizCorrectPos1 !==''&& this.quizCorrectPos2 !==''&& this.quizCorrectPos3 !==''){
                       await ApiServices.newQuizSve({
                         quizLevel: this.quizLevel,
                         quizPart1: this.quizPart1,
                         quizPart2: this.quizPart2,
                         quizPart3: this.quizPart3,
                         quizAnswer1: this.quizAnswer1,
                         quizAnswer2: this.quizAnswer2,
                         quizAnswer3: this.quizAnswer3,
                         quizCorrectPos1: this.quizCorrectPos1,
                         quizCorrectPos2: this.quizCorrectPos2,
                         quizCorrectPos3: this.quizCorrectPos3

                      });
                      this.emptyFields();
                    }
      },

    },

  }
</script>

<style scoped>
    input[type=text], input[type=number],input[type=file], select,textarea, label {
        padding: 10px;
        margin-top: 2px;
        margin-bottom: 2px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
        background: rgba(62, 61, 61, 0.73);
        color: wheat;
        font-family: Calibri, monospace;
        font-weight: bold;
        width: 99%;
        height: 40px;
        cursor: pointer;
    }
    p{
        font-family: Calibri, monospace;
        font-weight: bolder;
        color: #1b9b52;
    }
    h1{
        font-family: Calibri, monospace;
        color: wheat;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 5px;
        margin-bottom: 5px;
    }
    .btn-save{
        margin-top: 2px;
        margin-bottom: 2px;
        background-color: rgba(3, 90, 246, 0.72);
        font-family: Calibri, monospace;
        font-weight: bold;
        color: rgba(245, 222, 179, 0.64);
        border: 1px solid black;
        width: 49%;
        height: 40px;
        cursor: pointer;
    }
    .btn-back{
        background-color: rgba(139, 0, 0, 0.66);
        margin-top: 2px;
        margin-bottom: 2px;
        font-family: Calibri, monospace;
        font-weight: bold;
        color: rgba(245, 222, 179, 0.64);
        border: 1px solid black;
        width: 49%;
        height: 40px;
        cursor: pointer;
    }
    .btn-back:hover{
        background-color: darkred;
        color: white;
    }

    .btn-save:hover {
        background-color: #035af6;
        color: white;
    }

    .createQuiz {
        display: table-cell;
        text-align: center;
        vertical-align: top;
        background: rgba(0, 0, 0, 0.7);
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
        .createQuiz {
            padding-bottom: 10px;
        }
        input[type=text], input[type=number],input[type=file], select,textarea, label {
            background: rgba(62, 61, 61, 0.73);
            margin: 3px;
        }
        .addQuiz{
            width: 99%;
            margin: auto;
            padding: 10px;
        }
        .btn-save, .btn-back{
            width: 30%;

        }
    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
        .createQuiz {
            display: table-cell;
            text-align: center;
            vertical-align: top;
            background: rgba(0, 0, 0, 0.7);
            padding-bottom: 10px;
        }
        input[type=text], input[type=number], input[type=file],select, textarea, label {
            background: rgba(5, 5, 5, 0.5);
            width: 90%;
            margin-top: 5px;

        }
        .btn-save, .btn-back{
            width: 20%;
        }
        .addQuiz{
            width: 90%;
            margin: auto;
            padding: 10px;
        }
    }
</style>