<template>
    <div class="allQuiz">
        <select id="subject" name="subject" @change="onChange($event)" v-model="value">
        <option value="default">Select The Subject</option>
        <option value="geoQuiz">Geografi</option>
        <option value="matteQuiz">Matematik</option>
        <option value="svenskaQuiz">Svenska</option>
        <option value="engelskaQuiz">Engelska</option>
        </select><br>
        <input type="submit" value="GET" @click="getQuiz()">
        <div class="showLevel" id="showLevel"></div>
    </div>

</template>

<script>
  export default {
    name: 'DispoQuiz',
    data: function () {
      return {
        value: 'default',
        levels:[],
      }
    },
    methods:{
      onChange (event) {
        this.value = event.target.value;
      },
      getQuiz(){
        if (this.value === 'geoQuiz'){
          this.getGeoQuiz();
          this.createQuizTable();
        }
      },
      createQuizTable() {
        const table = document.createElement('table')
        table.className = "userTable";
        let i,j;
        const arrItems = this.levels
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
            const tabCell = tr.insertCell(-1)
            tabCell.innerHTML = arrItems[i][col[j]];
          }
        }
        const divContainer = document.getElementById('showLevel')
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
      },
      getGeoQuiz() {
        fetch('http://127.0.0.1:3000/api/geoQuiz/Levels')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.levels = data.geoQuizLevel;
          });
      }
    },

  }
</script>

<style scoped>
    .allQuiz {
        display: table-cell;
        text-align: center;
        vertical-align: top;
        padding: 5px;
        background: rgba(0, 0, 0, 0.8);
    }
    .showLevel{
        padding-top: 10px;
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