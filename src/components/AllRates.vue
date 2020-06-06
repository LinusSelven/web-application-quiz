<template>
    <div class="rate-body">
        <h1>ALL RATES</h1>
        <select id="subject" name="subject" @change="onChangeSubject($event)" v-model="value">
            <option value="default">Select The Subject</option>
            <option value="Geography">Geografi</option>
            <option value="Mathematics">Matematik</option>
            <option value="Swedish">Svenska</option>
            <option value="English">Engelska</option>
        </select><br>
        <select id="byQuizLevel" @change="onChangeLevels($event)" v-model="levelValue"></select><br>
        <input type="submit" value="GET" @click="getRates()">
        <br>
        <br>
        <table class="rateTable" id="rateTable">
            <thead>
            <tr>
                <th>RATING</th>
                <th>Quantity</th>
            </tr>
            </thead>
        </table>
    </div>
</template>

<script>
  import ApiServices from '../services/ApiServices'
  import $ from 'jquery'

  export default {
    name: 'AllRates',
    data: function () {
      return {
        value: 'default',
        levelValue:1,
        rateArray:[],
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
      async getRates() {
        if (this.value !== 'default'){
          let response = await ApiServices.getQuantityRates({
            subject: this.value,
            subjectLevel: this.levelValue
          });
          this.rateArray = response.data.rates;
          this.ratesTable();
        }
      },
      ratesTable(){
        //$("#rateTable tr").remove();
        $('#rateTable tbody tr').remove()
        const table = document.getElementById('rateTable')
        let i,j;
        const arrItems = this.rateArray;
        const col = []
        let cells = []
        let oneCell='';
        for (i = 0; i < arrItems.length; i++) {
          for (const key in arrItems[i]) {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }
        for (i = 0; i < arrItems.length; i++) {
          let tr = table.insertRow(-1);
          const tabCell1 = tr.insertCell(-1)
          const tabCell2 = tr.insertCell(-1)
          for (j = 0; j < col.length; j++) {
            cells.push(arrItems[i][col[j]]);
          }
          oneCell = this.convertDataToRate(cells[0]);
          tabCell1.innerHTML=oneCell;
          tabCell2.innerHTML=cells[1]+' Person(s)';
          cells = [];
          oneCell='';
        }
      },
      convertDataToRate(num) {
        let newCell = '';
        const starOff = '<img src="https://img.icons8.com/windows/32/000000/filled-star.png" alt="off" width="30" height="30"/>'
        const starOn = '<img src="https://img.icons8.com/color/48/000000/filled-star.png" alt="on" width="30" height="30"/>'
        let amountOff = '';
        let amountOn = '';
        let amount = num;

        for (let i = 0; i < (5 - amount); i++) {amountOff += starOff;}
        for (let j = 0; j < amount; j++) {amountOn += starOn;}
        newCell='<span>'+amountOn + amountOff +'</span>';
        //newCell.push('<h5>'+arrayRate[1] +'</h5>');
        return newCell;
      },
    }
  }
</script>

<style scoped>
    .rate-body {
        display: table-cell;
        text-align: center;
        vertical-align: top;
        background: rgba(0, 0, 0, 0.8);
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
    .rateTable {
        margin: auto;
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        width: 100%;
        border-collapse: collapse;
        color: rgba(6, 25, 45, 0.6);
        background: rgba(250, 250, 252, 0.55);
    //background: rgba(0, 0, 0, 0.9);

    }
    .rateTable th {
        padding-left: 4px;
        text-transform: uppercase;
        text-align: center;
        background: #44475C;
        color: #ccc;
        height: 45px
    }

    .rateTable td {
        padding-left: 4px;
        vertical-align: middle;
        text-align: center;
        color: navajowhite;
        height: 35px;
    }
    .rateTable td:last-child {
    }
    .rateTable tbody tr:nth-child(2n) td {
        background-color: rgba(61, 140, 181, 0.42);
    //background: rgba(0, 0, 0, 0.5);
    }
    /* Mobile */
    @media screen and (max-width: 400px) {
    }

    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        input[type=submit], select{
            width: 50%;
        }
    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
        input[type=submit], select{
            width: 300px;
        }
        .rateTable {
            width: 60%;
        }
    }
</style>