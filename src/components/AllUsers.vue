<template>
    <div class="allUsers">
        <h1>MY USERS</h1>
      <div class="showData" id="showData"></div>
    </div>
</template>
<script>
  import AuthServices from '../services/ApiServices'
  import $ from 'jquery'
  export default {
    name: 'AdminDashboard',
    data: function () {
      return {
        message:'',
        selectedId:0,
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
                const table = document.createElement('table')
                table.className = "userTable";
                let i,j;
                const arrItems = this.users
                const titles = ['ID', 'ROLE', 'FULL NAME', 'EMAIL', 'PASSWORD', 'PHONE', 'FUNCTION']
                const col = []
                for (i = 0; i < arrItems.length; i++) {
                  for (var key in arrItems[i]) {
                    if (col.indexOf(key) === -1) {
                      col.push(key);
                    }
                  }
                }
                col.push('function');
                let tr = table.insertRow(-1)
                for (i = 0; i < titles.length; i++) {
                  const th = document.createElement('th')
                  th.innerHTML = titles[i];
                    tr.appendChild(th);
                }
                for (i = 0; i < arrItems.length; i++) {
                  tr = table.insertRow(-1);
                  for (j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1)
                    tabCell.innerHTML = arrItems[i][col[j]];
                  }
                  tabCell.innerHTML = '<input type="submit" class="deleteButton" value="DELETE">';
                }
                const divContainer = document.getElementById('showData')
                divContainer.innerHTML = "";
                divContainer.appendChild(table);
            $(".deleteButton").click(this.deleteUsers);
          },
          async deleteUsers(e) {
            e = e || window.event;
            let target = e.srcElement || e.target
            while (target && target.nodeName !== "TR") {
              target = target.parentNode;
            }
            const cells = target.getElementsByTagName('td')
            this.selectedId = (cells[0].innerHTML);
            await AuthServices.deleteUser(this.selectedId);
            self.location.reload()
          },

    },
  }
</script>

<style>
    .allUsers {
        display: table-cell;
        text-align: center;
        vertical-align: top;
        background: rgba(0, 0, 0, 0.8);
    }
    .showData{
        padding: 20px 10px 10px 10px;
    }
    h1{
        font-family: Calibri, monospace;
        color: wheat;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 5px;
        margin: auto;
    }
    .userTable {
        margin: auto;
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        width: 100%;
        border-collapse: collapse;
        color: rgba(6, 25, 45, 0.6);
        background: rgba(250, 250, 252, 0.55);
        //background: rgba(0, 0, 0, 0.9);

    }
    .userTable th {
        padding-left: 4px;
        text-transform: uppercase;
        text-align: center;
        background: #44475C;
        color: #ccc;
        height: 45px
    }

    .userTable td {
        padding-left: 4px;
        vertical-align: middle;
        text-align: center;
        color: navajowhite;
        height: 35px;
    }
    .userTable td:last-child {
    }
    .userTable tbody tr:nth-child(2n) td {
        background-color: rgba(61, 140, 181, 0.42);
        //background: rgba(0, 0, 0, 0.5);
    }
    .deleteButton {
        background-color: #d61515;
        font-family: Calibri, monospace;
        font-weight: bold;
        border: none;
        color: white;
        width: 70px;
        height: 30px;
        cursor: pointer;
    }
    .deleteQuestion {
        background-color: #d61515;
        font-family: Calibri, monospace;
        font-weight: bold;
        border: none;
        color: white;
        width: 70px;
        height: 30px;
        cursor: pointer;
    }
    .update {
        background-color: #035af6;
        font-family: Calibri, monospace;
        font-weight: bold;
        border: none;
        color: white;
        width: 70px;
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
        .userTable {
        }
    }
</style>