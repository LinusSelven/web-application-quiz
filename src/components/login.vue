<template>
    <div class="signIn" >
        <table class="center">
            <tr>
                <td><p id="errorMsg">{{message}}</p></td>
            </tr>
            <tr>
                <td v-if="isLogged"><input type="button" @click="submitLogout" value="login"></td>
            </tr>
            <tr>
                <td v-if="!isLogged"><input value="email" type="email" name="user-log" v-model="email" placeholder="Email" ></td>
            </tr>
            <tr>
                <td v-if="!isLogged"><input value="password" type="password" name="user-log" v-model="password" placeholder="Password"></td>
            </tr>
            <tr>
                <td v-if="!isLogged"><input type="button" @click="submitForm" value="login"></td>
            </tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr>
                <td v-if="!isLogged"><input name="rememberMe" type="checkbox" value="Remember Me"><span>Jag vill förbli inloggad</span> </td>
            </tr>
            <tr>
                <td v-if="!isLogged"> <a href="#" rel="">Har du glömt lösenordet?</a>&nbsp;&nbsp; <span>Inget konto! </span><a><router-link to="/register">Registrera!</router-link></a></td>
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
              message:'',
              isLogged: false,
            }
        },
        methods:{
              async submitForm() {
                    const response = await AuthServices.login({
                      email: this.email,
                      password: this.password
                    });
                    if (response.data.isSessionCreated){
                      /*const jsonObject = '{"message": "'+response.data.message+'", "fullName": "'+response.data.fullName+'", "userRole": "'+response.data.userRole+'", "userId": "'+response.data.userId+'"}';
                      let obj = JSON.parse(jsonObject);
                      let jsonUser_serialized = JSON.stringify(obj);
                      sessionStorage.setItem("userLogged", jsonUser_serialized);*/
                      localStorage.setItem("message", response.data.message);
                      localStorage.setItem("fullName", response.data.fullName);
                      localStorage.setItem("userRole", response.data.userRole);
                      localStorage.setItem("userId", response.data.userId);
                      this.message= response.data.message+", "+sessionStorage.getItem("fullName");
                      this.isLogged = true;
                      this.email = '';
                      this.password = '';
                    }
                    else {
                      this.message = response.data.message;
                      this.email = '';
                      this.password = '';
                    }
              },
          submitLogout() {
            localStorage.clear();
          },
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
        .signIn{
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