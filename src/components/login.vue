<template>
    <div class="myPage" >



    </div>
</template>

<script>
  export default {
        name: "login",
        data: function () {
            return{



            }
        },
        methods:{
              async getUserData() {
                let response = await AuthServices.userData({
                  userId: parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId)
                });
                let jsonUser_serialized = JSON.stringify(response.data.user);
                localStorage.setItem("userData", jsonUser_serialized);
              }
        }
  }



  import AuthServices from '../services/ApiServices';
</script>

<style scoped>
    .center{
        margin: 0 auto;
    }
    .login a {
        color: #02b3b3;
        text-decoration: none;
    }
    .login a:hover {
        color: #0b5b5b;
    }
    #errorMsg{
        font-family: Calibri, monospace;
        font-weight: normal;
        color: #fa7c8b;
    }

    input[type=email], input[type=password], input[type=checkbox] {
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
    label{
        padding: 5px;
        margin-top: 2px;
        margin-bottom: 2px;
        text-align: center;
        width: 100%;
    }
    .vl {
        border-left: 2px solid dimgray;
        height: 100%;
    }
    input[type=checkbox]{
        height: auto;
        width: auto;
    }
    input[type=button] {
        background-color: #222222;
        font-family: "Times New Roman", monospace;
        font-weight: bold;
        color: #02b3b3;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        width: 100%;
        height: 40px;
        cursor: pointer;
    }

    input[type=button]:hover {
        background-color: #e9e608;
        color: black;
    }
    span{
        font-family: Calibri, monospace;
        font-weight: normal;
        color: wheat;
    }
    .myPage{
        display: inline-block;
        width: 100%;
    }
    .myPage a {
        color: #3d8cb5;
        text-decoration: none;
        cursor: pointer;
    }
    .myPage a:hover {
        color: #e9e608;
    }
    table {
        width: 100%;
        font: inherit;
        border-collapse: collapse;
        color: rgba(6, 25, 45, 0.6);
    }

    table th {
        text-transform: uppercase;
        text-align: center;
        background: #44475C;
        color: #FFF;
        padding-top: 5px;
    }

    table td {
        padding-top: 5px;
        text-align: center;
        border-right: 2px solid #7D82A8;
    }
    table td:last-child {
        border-right: none;
    }
    table tbody tr:nth-child(2n) td {
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
        .myPage{
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            background: rgba(0, 0, 0, 0.7);
        }
        table {
            width: 50%;
        }


    }





</style>