<template>

    <div>
        <section class="item3">
    <div class="signIn" >


    <form >
        <table class="center">
            <tr>
                <td><p>Error Message</p></td>
            </tr>
            <tr>
                <td><input value="Användarnamn" type="text" name="user-log"></td>
            </tr>
            <tr>
                <td><input value="Lösenord" type="password" name="user-log"></td>
            </tr>
            <tr>
                <td><input name="rememberMe" type="checkbox" value="Remember Me"> Jag vill förbli inloggad</td>
            </tr>
            <tr>
                <td><input type="submit" name="login" value="Logga in"></td>
            </tr>
            <tr><td></td></tr>
            <tr>
                <td> <a href="#" rel="">Har du glömt lösenordet?</a>&nbsp; <a class="vl"></a>&nbsp; Inget konto!  <a v-on:click="registerButton()" rel="register">Registrera!</a></td>
            </tr>

        </table>
    </form>
    </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped>
    .item3 {
        padding: 10px 5px 10px 5px;
        grid-area: sidebar;
    }
    .login{
        text-align: center;
        margin-left:auto;
        margin-right:auto;
        padding:80px 5px 80px 5px;
        grid-area: sidebar;

    }
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

    .user-log{
        background: #FFFFFF;
        border-radius: 10px;
        width:350px;
        height:30px;
        padding:5px;
        font-size:15px;
        color:#999999;

    }

    .submit-log{
        background:#02b3b3;
        border-radius: 10px;
        border:none;
        width:355px;
        height:40px;
        cursor:pointer;
        font-size:15px;
        color:#FFFFFF; }

    input[type=text], input[type=password], input[type=checkbox], select, textarea {
        padding: 10px;
        margin-top: 2px;
        margin-bottom: 2px;
        border: 1px solid rgb(0, 31, 31);
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
        background: wheat;
        color: dimgray;
        font-family: "Times New Roman", monospace;
        font-weight: bold;
        width: 100%;
        height: 40px;
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
    input[type=submit] {
        background-color: #333333;
        font-family: "Times New Roman", monospace;
        font-weight: bold;
        color: #02b3b3;
        border-radius: 6px;
        width: 100%;
        height: 40px;
        cursor: pointer;
    }

    input[type=submit]:hover {
        background-color: #0b5b5b;
        color: wheat;
    }

    .register {
        display: inline-block;
        width: 100%;
    }
    span{
        font-family: "Times New Roman", monospace;
        font-weight: bold;
        color: dimgray;
    }
    ::-webkit-input-placeholder { /* Edge */
        color: #fced62;
    }

    :-ms-input-placeholder { /* Internet Explorer */
        color: #fced62;
    }

    ::placeholder {
        color: dimgray;
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




    /*  Aisha style */
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

    .user-log{
        background: #FFFFFF;
        border-radius: 10px;
        width:350px;
        height:30px;
        padding:5px;
        font-size:15px;
        color:#999999;

    }

    .submit-log{
        background:#02b3b3;
        border-radius: 10px;
        border:none;
        width:355px;
        height:40px;
        cursor:pointer;
        font-size:15px;
        color:#FFFFFF; }

    .q-question{
        color: #02b3b3;
    }
    .q-img{
        margin: 0 auto;
        width: 250px;
    }
    .q-answer{
        text-align: center;
        margin-left:auto;
        margin-right:auto;
    }
    .q-btn{
        width: 10%;
        background-color: #333333;
        font-size: 20px;
        color: #02b3b3;
        height: 50px;

    }
    .q-btn:hover {
        background-color: #0b5b5b;
        color: wheat;
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
        .signIn{
            width: 60%;
        }
        table {
            width: 50%;
        }
    }
</style>