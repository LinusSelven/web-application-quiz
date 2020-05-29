<template>
    <div class="showData" id="showData"></div>

</template>
<script>
  import AuthServices from '../services/ApiServices'

  export default {
    name: 'AdminDashboard',
    data: function () {
      return {
        users:[],
      }
    },
    async mounted () {
      let response = await AuthServices.getAllUsers();
      this.users = response.data.users;
      this.createTable();
    },
    methods:{
      createTable() {
          let i;
          const arrItems = this.users;
          const col = [];
          for (i = 0; i < arrItems.length; i++) {
            for (const key in arrItems[i]) {
              if (col.indexOf(key) === -1) {
                col.push(key);
              }
            }
          }
          col.push('function');
          const table = document.createElement('table')
          table.setAttribute('class', 'userTable');
          let tr = table.insertRow(-1)
          for ( i = 0; i < col.length; i++) {
            var th = document.createElement('th')
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
        for (i = 0; i < arrItems.length; i++) {
            tr = table.insertRow(-1);
            for (let j = 0; j < col.length; j++) {
              var tabCell = tr.insertCell(-1)
              tabCell.innerHTML = arrItems[i][col[j]];
            }
            tabCell.innerHTML = '<input type="submit" class="submit" value="DELETE">';
        }
        const divContainer = document.getElementById('showData')
          divContainer.innerHTML = "";
          divContainer.appendChild(table);
      },
      deleteUser(){
      }
    },
  }
</script>

<style>
    .showData {
        display: table-cell;
        text-align: center;
        vertical-align: top;
        padding: 5px;
        background: rgba(0, 0, 0, 0.8);
        //background: #f1f1f1;
    }
    .userTable {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        width: 100%;
        border-collapse: collapse;
        color: rgba(6, 25, 45, 0.6);
        //background: #7D82A8;
        background: rgba(0, 0, 0, 0.9);

    }
    .userTable th {
        padding-left: 4px;
        text-transform: uppercase;
        text-align: left;
        background: #44475C;
        color: #ccc;
        height: 45px
    }

    .userTable td {
        padding-left: 4px;
        vertical-align: middle;
        text-align: left;
        color: wheat;
        height: 35px;
    }
    .userTable td:last-child {
    }
    .userTable tbody tr:nth-child(2n) td {
        //background-color: #3d8cb5;
        background: rgba(0, 0, 0, 0.5);
    }
    .submit {
        background-color: #d61515;
        font-family: Calibri, monospace;
        font-weight: bold;
        color: white;
        width: 100px;
        height: 30px;
        cursor: pointer;
    }
    /* Mobile */
    @media screen and (max-width: 400px) {
    }
    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
    }
</style>