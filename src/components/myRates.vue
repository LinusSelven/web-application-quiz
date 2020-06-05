<template>
    <div class="myScores">
        <h1>MY RATE</h1>
        <div class="showMyScores" id="showMyScores"></div>
    </div>

</template>

<script>
  import ApiServices from '../services/ApiServices'
  export default {
    name: 'myRates',
    data: function () {
      return {
        myScores:[],
      }
    },
    methods:{
      createMyScoresTable() {
        const table = document.createElement('table')
        table.className = "userTable";
        let i,j;
        const arrItems = this.myScores.sort((a,b) => (a.QUIZ > b.QUIZ) ? 1 : ((b.QUIZ > a.QUIZ) ? -1 : 0));
        //this.myScores.sort((a, b) => (b.QUIZ-a.QUIZ));
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
        const divContainer = document.getElementById('showMyScores')
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
      },
    },
    async mounted () {
      let response = await ApiServices.getScoresByUsers({
        userId: parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId)
      });
      this.myScores = response.data.scores;
      this.createMyScoresTable();
    }
  }
</script>

<style scoped>
    .myScores {
        display: table-cell;
        text-align: center;
        vertical-align: top;
        background: rgba(0, 0, 0, 0.8);
    }
    .showMyScores{
        padding: 20px 10px 10px 10px;
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