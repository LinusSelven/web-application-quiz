<template>
    <div class="allQuiz">
        <h1>ALL QUIZZES</h1>
        <select id="subject" name="subject" @change="onChange($event)" v-model="value">
        <option value="default">Select The Subject</option>
        <option value="geoQuiz">Geografi</option>
        <option value="matteQuiz">Matematik</option>
        <option value="svenskaQuiz">Svenska</option>
        <option value="engelskaQuiz">Engelska</option>
        </select><br>
        <select id="byLevel" @change="onChangeLevel($event)" v-model="levelValue"></select><br>
        <input type="submit" value="GET" @click="getQuiz()">
        <div class="showLevel" id="showLevel"></div>
    </div>

</template>

<script>
  import ApiServices from '../services/ApiServices'
  import AuthServices from '../services/ApiServices'
  import $ from 'jquery'
  export default {
    name: 'DispoQuiz',
    data: function () {
      return {
        value: 'default',
        levelValue:1,
        quizArray:[],
        levels:[],
        byLevel:[],
      }
    },
    methods:{
      async onChange (event) {
        this.value = event.target.value;
        if (this.value === 'geoQuiz') {
          this.levels=[];
          this.removeAllOptions();
          await this.getGeoQuiz();
          this.byLevel=[];
          this.getArrayLength();
          this.createOptions();
        } else if (this.value === 'matteQuiz') {
          this.levels=[];
          this.removeAllOptions();
          await this.getMatteQuiz();
          this.byLevel=[];
          this.getArrayLength();
          this.createOptions();
        } else if (this.value === 'engelskaQuiz') {
          this.levels=[];
          this.removeAllOptions();
          await this.getEngQuiz();
          this.byLevel=[];
          this.getArrayLength();
          this.createOptions();
        }
        else if (this.value === 'svenskaQuiz') {
          this.levels=[];
          this.removeAllOptions();
          await this.getSvenQuiz();
          this.byLevel=[];
          this.getArrayLength();
          this.createOptions();
        }
      },
      removeAllOptions: function(){
        const select = document.getElementById('byLevel')
        select.options.length = 0;
      },
      createOptions: function(){
        const sel = document.getElementById('byLevel')
        for(let i = 0; i < this.byLevel.length; i++) {
          const opt = document.createElement('option')
          opt.innerHTML = this.byLevel[i];
          opt.value = this.byLevel[i];
          sel.appendChild(opt);
        }
      },
      getArrayLength(){
        for (let i=0;i<this.levels.length;i++){
          this.byLevel.push(i+1)
        }
      },
      onChangeLevel (event) {
        this.levelValue = event.target.value;
      },
      createQuizTable() {
        const table = document.createElement('table')
        table.className = "userTable";
        let i,j;
        const arrItems = this.quizArray
        const col = []
        for (i = 0; i < arrItems.length; i++) {
          for (const key in arrItems[i]) {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }
        col.push('function');
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
          tabCell.innerHTML = '<input type="submit" class="update" value="UPDATE"><input type="submit" class="deleteQuestion" value="DELETE">';
        }
        const divContainer = document.getElementById('showLevel')
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        $(".deleteQuestion").click(this.deleteQuestion);
      },
      async deleteQuestion(e) {
        e = e || window.event;
        let target = e.srcElement || e.target
        while (target && target.nodeName !== "TR") {
          target = target.parentNode;
        }
        const cells = target.getElementsByTagName('td')
        this.selectedId = (cells[0].innerHTML);

        if (this.value === 'geoQuiz'){
          await AuthServices.deleteGeoQuiz(this.selectedId);
          await this.getQuiz();
        }else if (this.value === 'matteQuiz') {
          await AuthServices.deleteMatteQuiz(this.selectedId);
          await this.getQuiz();
        }else if (this.value === 'engelskaQuiz') {
          await AuthServices.deleteEngQuiz(this.selectedId);
          await this.getQuiz();
        }else if (this.value ==='svenskaQuiz'){
          await AuthServices.deleteSveQuiz(this.selectedId);
          await this.getQuiz();
        }
      },
      async getQuiz() {
        if (this.value === 'geoQuiz') {
          await this.getGeoQuizByLevel(this.levelValue);
          this.createQuizTable();
        } else if (this.value === 'matteQuiz') {
          await this.getMatteQuizByLevel(this.levelValue);
          this.createQuizTable();
        } else if (this.value === 'engelskaQuiz') {
          await this. getEngQuizByLevel(this.levelValue);
          this.createQuizTable();
        }else if (this.value ==='svenskaQuiz'){
          await this. getSvenQuizByLevel(this.levelValue);
          this.createQuizTable();
        }
      },
      getGeoQuiz: async function () {
        let response = await ApiServices.getGeoQuizLevel();
        this.levels = response.data.levels;
      },
      async getGeoQuizByLevel (id) {
        let response = await ApiServices.getGeoQuizByLevel(id);
            this.quizArray = response.data.geoQuiz;
      },
      getMatteQuiz: async function () {
        let response = await ApiServices.getMatteQuizLevel();
        this.levels = response.data.levels;
      },
      async getMatteQuizByLevel (id) {
        let response = await ApiServices.getMatteQuizByLevel(id);
        this.quizArray = response.data.matteQuiz;
      },
      getEngQuiz: async function () {
        let response = await ApiServices.getEngQuizLevel();
        this.levels = response.data.levels;
      },
      async getEngQuizByLevel (id) {
        let response = await ApiServices.getEngQuizByLevel(id);
        this.quizArray = response.data.engQuiz;
      },
      getSvenQuiz: async function () {
        let response = await ApiServices.getSveQuizLevel();
        this.levels = response.data.levels;
      },
      async getSvenQuizByLevel (id) {
        let response = await ApiServices.getSveQuizByLevel(id);
        this.quizArray = response.data.svenskaQuiz;
      },
    },

  }
</script>

<style scoped>
    .allQuiz {
        display: table-cell;
        text-align: center;
        vertical-align: top;
        background: rgba(0, 0, 0, 0.8);
    }
    .showLevel{
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