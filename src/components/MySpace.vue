<template>
    <div class="myPage" >
        <h1>MY PROFILE</h1>
        <table class="center">
            <tr>
                <td></td>
            </tr>
            <tr>
                <td><label class="labelName">User Role</label>&nbsp;<label>{{user.userRole}}</label></td>
            </tr>
            <tr>
                <td><label class="labelName">Full Name</label>&nbsp;<label>{{user.fullName}}</label></td>
            </tr>
            <tr>
                <td><label class="labelName">Email</label>&nbsp;<label>{{user.email}}</label></td>
            </tr>
            <tr>
                <td><label class="labelName">Phone</label>&nbsp;<label>{{user.phoneNumber}}</label></td>
            </tr>
            <tr>
                <td><h1>Change your password</h1></td>
            </tr>
            <tr>
                <td><span class="errorMessage">{{validation}}</span></td>
            </tr>
            <tr>
                <td><span class="confirmationMessage">{{confirmation}}</span></td>
            </tr>
            <tr>
                <td><label class="labelName">Old PassWord</label>&nbsp;<input class="passInput" type="password" placeholder="*******" v-model="oldPass"></td>
            </tr>
            <tr>
                <td><label class="labelName">New PassWord</label>&nbsp;<input class="passInput" type="password" placeholder="*******" v-model="newPass" minlength="6"></td>
            </tr>
            <tr>
                <td><label class="labelName">Confirm new passWord</label>&nbsp;<input class="passInput" type="password" placeholder="*******" v-model="confirmNewPass"></td>
            </tr>

            <tr>
                <td><input type="button" value="Update" v-on:click="modifyPassword()"></td>
            </tr>
        </table>

    </div>
</template>

<script>
    export default {
        name: "login",
        data: function () {
            return {
              user:[],
              oldPass:'',
              newPass: '',
              confirmNewPass:'',
              confirmation:'',
              validation:'',
            }
        },
        methods:{
                async modifyPassword() {
                  if (this.oldPass && this.newPass && this.confirmNewPass){
                    if (this.user.password === this.oldPass){
                      this.confirmation='';
                      this.validation='';
                      const verifyPass = await AuthServices.verifyPasswords({
                        password1: this.newPass,
                        password2: this.confirmNewPass
                      });
                      if (!verifyPass.data.isIdentical) {
                        this.validation = verifyPass.data.message;
                        this.oldPass='';
                        this.newPass='';
                        this.confirmNewPass = '';
                      }else {
                        let response = await AuthServices.modifyUser(parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId), {
                          userRole: this.user.userRole,
                          fullName: this.user.fullName,
                          email: this.user.email,
                          password: this.confirmNewPass,
                          phoneNumber: this.user.phoneNumber
                        });
                        this.confirmation = response.data.message;
                        this.oldPass='';
                        this.newPass='';
                        this.confirmNewPass = '';
                      }
                    }else {
                      this.validation = 'Old password is not correct';
                      this.oldPass='';
                      this.newPass='';
                      this.confirmNewPass = '';
                    }
                  }else {
                    this.validation = 'Please fill in all fields bellow!';
                    this.oldPass='';
                    this.newPass='';
                    this.confirmNewPass = '';
                  }

                }
        },
      async mounted () {
        let response = await AuthServices.getOneUser(parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId));
        this.user = response.data.user;
        console.log(this.user.length)
      },
    }
  import AuthServices from '../services/ApiServices';
</script>

<style scoped>
    * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .myPage {
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
    h4{
        font-family: "Calibri Light", monospace;
        font-weight: bold;
        color: wheat;
    }
    .confirmationMessage{
        font-family: "Calibri Light", monospace;
        font-size: medium;
        color: #0a7272;
        background-color: black;

    }
    .errorMessage{
        font-family: "Calibri Light", monospace;
        font-size: medium;
        color: darkred;
        background-color: black;

    }
    .passInput, label {
        padding: 10px;
        border: 1px solid rgb(167, 193, 193);
        box-sizing: border-box;
        resize: vertical;
        background: rgba(0, 1, 9, 0.59);
        color: #ccc;
        font-family: Calibri, monospace;
        font-size: small;
        width: 64%;
        height: 40px;
        border-radius: 0;
    }
    label{
        display: inline-block;
        vertical-align: middle;
    }
    .labelName{
        margin: auto;
        color: #ccc;
        border: 1px solid rgb(167, 193, 193);
        background: transparent;
        border-radius: 0;
        width: 35%;
        font-family: Calibri, monospace;
        font-size: small;
        text-align: left;
    }
    input[type=button] {
        background: rgba(0, 1, 9, 0.59);
        font-family: Calibri, monospace;
        font-size: small;
        color: #02b3b3;
        border-radius: 0;
        border: 1px solid rgb(7, 172, 172);
        width: 100%;
        height: 40px;
        cursor: pointer;
    }
    input[type=button]:hover {
        background-color: #e9e608;
        color: black;
    }
    ::-webkit-input-placeholder { /* Edge */
        color: #ccc;
        font-family: Calibri, monospace;
        font-size: small;
    }

    ::-ms-input-placeholder { /* Internet Explorer */
        color: #ccc;
        font-family: Calibri, monospace;
        font-size: small;
    }

    ::placeholder {
        font-family: Calibri, monospace;
        font-size: small;
        color: #ccc;
    }

    /* Mobile */
    @media screen and (max-width: 400px) {
    }
    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        .labelName{
            background-color: rgba(245, 245, 245, 0.49);
            color: black;
        }
    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
        .passInput, input[type=button], label {
            padding: 10px;
            margin-top: 2px;
            margin-bottom: 2px;
            width: 200px;

        }
        p{
            width: 100%;
        }
        label{
            display: inline-block;
        }
        .labelName{
            border: 1px solid rgb(167, 193, 193);
            background: rgba(0, 1, 9, 0.59);
            text-align: left;
            width: 180px;
        }

    }


</style>