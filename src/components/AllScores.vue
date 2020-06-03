<template>
    <div class="allScores">
        <h1>ALL SCORES</h1>
        <select id="subject" name="subject" @change="onChangeSubject($event)" v-model="value">
            <option value="default">Select The Subject</option>
            <option value="Geography">Geografi</option>
            <option value="Mathematics">Matematik</option>
            <option value="Swedish">Svenska</option>
            <option value="English">Engelska</option>
        </select><br>
        <select id="byQuizLevel" @change="onChangeLevels($event)" v-model="levelValue"></select><br>
        <input type="submit" value="GET" @click="getScores()">
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
        scoreArray:[],
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
      async getScores() {
        if (this.value !== 'default'){
          let response = await ApiServices.getAllScores({
            subject: this.value,
            subjectLevel: this.levelValue
          });
          this.scoreArray = response.data.scores;
          this.createAllScoresTable();
        }
      },
      createAllScoresTable() {
        const table = document.createElement('table')
        table.className = "userTable";
        let i,j;
        const arrItems = this.scoreArray.sort((a, b) => (b.QUIZ) - (a.QUIZ));
        const col = []
        for (i = 0; i < arrItems.length; i++) {
          for (const key in arrItems[i]) {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }
        let tr = table.insertRow(-1)
        for (i = 0; i < col.length; i++) {
          const th = document.createElement('th')
          th.innerHTML = col[i];
          tr.appendChild(th);
        }
        for (i = 0; i < arrItems.length; i++) {
          tr = table.insertRow(-1);
          for (j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1)
            tabCell.innerHTML = arrItems[i][col[j]];
          }
        }
        const divContainer = document.getElementById('showAllScores')
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
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