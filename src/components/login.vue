<template>
    <div class="signIn" >
        <table class="center">
            <tr>
                <td><p id="errorMsg">{{errorMessage}}</p></td>
            </tr>
            <tr>
                <td><input value="email" type="email" name="user-log" v-model="email" placeholder="Email"></td>
            </tr>
            <tr>
                <td><input value="password" type="password" name="user-log" v-model="password" placeholder="Password"></td>
            </tr>
            <tr>
                <td><input type="button" @click="submitForm" value="login"></td>
            </tr>
            <tr>
                <td><input name="rememberMe" type="checkbox" value="Remember Me"><span>Jag vill förbli inloggad</span> </td>
            </tr>
            <tr><td></td></tr>
            <tr>
                <td> <a href="#" rel="">Har du glömt lösenordet?</a>&nbsp;&nbsp; <span>Inget konto! </span><a><router-link to="/register">Registrera!</router-link></a></td>
            </tr>

        </table>
    </div>
</template>

<script>
  export default {
        name: "login",
        data: function () {
            return{
                email:'',
                password:'',
              errorMessage:'',
            }
        },
        methods:{
              async submitForm() {
                    const response = await AuthServices.login({
                      email: this.email,
                      password: this.password
                    });
                    this.errorMessage = response.data.message;
                    this.email = '';
                    this.password = '';
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

    input[type=text], input[type=email], input[type=password], input[type=checkbox] {
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

    .register {
        display: inline-block;
        width: 100%;
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


    .signIn{
        display: inline-block;
        width: 100%;
    }
    .signIn a {
        color: #3d8cb5;
        text-decoration: none;
        cursor: pointer;
    }
    .signIn a:hover {
        color: #05e3e3;
    }
    table.center {
        margin-left:auto;
        margin-right:auto;
        color: rgba(6, 25, 45, 0.6);
    }
    table {
        width: 100%;
        font: inherit;
        border-collapse: collapse;
        margin-top: 1px;
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
    .login{
        text-align: center;
        margin-left:auto;
        margin-right:auto;
        padding:80px 5px 80px 5px;
        grid-area: sidebar;

    }
    .login a {
        color: #02b3b3;
        text-decoration: none;
    }
    .login a:hover {
        color: #0b5b5b;
    }

    /* Mobile */
    @media screen and (max-width: 400px) {
    }
    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
        .signIn{
            border: 1px solid #02b3b3;
            border-radius: 10px;
            background: rgba(0, 0, 0, .6);
            padding: 10px;
            width: 60%;
        }
        input[type=text], input[type=email], input[type=password], select, textarea, .label {
            padding: 10px;
            margin-top: 2px;
            margin-bottom: 2px;
            border: 1px solid rgb(7, 172, 172);
            border-radius: 4px;
            box-sizing: border-box;
            resize: vertical;
            background: rgba(5, 5, 5, 0.5);
            color: wheat;
            font-family: Calibri, monospace;
            font-weight: bold;
            width: 100%;
            height: 40px;
        }
        table {
            width: 50%;
        }

    }





</style>