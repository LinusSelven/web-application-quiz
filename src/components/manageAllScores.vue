<template>
    <div class="allScores">
        <h1>ALL SCORES</h1>
        <select id="subject" name="subject" @change="onChange($event)" v-model="value">
            <option value="default">Select The Subject</option>
            <option value="geoQuiz">Geografi</option>
            <option value="matteQuiz">Matematik</option>
            <option value="svenskaQuiz">Svenska</option>
            <option value="engelskaQuiz">Engelska</option>
        </select><br>
        <select id="byQuizLevel" @change="onChangeLevel($event)" v-model="levelValue"></select><br>
        <input type="submit" value="GET">
        <div class="showAllScores" id="showAllScores"></div>
    </div>
</template>

<script>
  import ApiServices from '../services/ApiServices'
  export default {
    name: 'manageAllScores',
    data: function () {
      return {
        value: 'default',
        levelValue:1,
        quizArray:[],
        levels:[],
        byLevel:[],
      }
    },
    methods: {
      async onChange (event) {
        this.value = event.target.value;
        if (this.value === 'geoQuiz') {
          this.levels = [];
          this.removeAllOptions();
          await this.getGeoQuiz();
          this.byLevel = [];
          this.getArrayLength();
          this.createOptions();
        } else if (this.value === 'matteQuiz') {
          this.levels = [];
          this.removeAllOptions();
          await this.getMatteQuiz();
          this.byLevel = [];
          this.getArrayLength();
          this.createOptions();
        } else if (this.value === 'engelskaQuiz') {
          this.levels = [];
          this.removeAllOptions();
          await this.getEngQuiz();
          this.byLevel = [];
          this.getArrayLength();
          this.createOptions();
        } else if (this.value === 'svenskaQuiz') {
          this.levels = [];
          this.removeAllOptions();
          await this.getSvenQuiz();
          this.byLevel = [];
          this.getArrayLength();
          this.createOptions();
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
          this.byLevel.push(i + 1)
        }
      },
      onChangeLevel (event) {
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
    }
  }
</script>

<style scoped>
    .allScores {
        display: table-cell;
        text-align: center;
        vertical-align: top;
        background: rgba(0, 0, 0, 0.8);
    }
    .showAllScores{
        padding: 10px 5px 5px 5px;
    }
    h1{
        font-family: Calibri, monospace;
        color: wheat;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 5px;
        margin: auto;
    }
    select{
        padding: 10px;
        margin-top: 2px;
        margin-bottom: 2px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
        background: #0f122d;
        color: wheat;
        font-family: Calibri, monospace;
        font-weight: bold;
        width: 100%;
        height: 40px;
        cursor: pointer;
    }
    input[type=submit] {
        margin-top: 2px;
        margin-bottom: 2px;
        background-color: #0f122d;
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
        background-color: #3d8cb5;
        border: 1px solid white;
        color: white;
    }
    /* Mobile */
    @media screen and (max-width: 400px) {
    }

    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    }

    /* Desktop */
    @media screen and (min-width: 1025px) {

        input[type=submit], select{
            width: 300px;
        }

    }
</style>