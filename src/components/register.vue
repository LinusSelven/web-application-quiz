<template>
    <div class="register" >
        <p>{{registrationStatus}}</p>
        <p id="validation">{{validation}}</p>
        <article v-show="isNotRegistered">
                <article class="label">
                    <span>I'm*&nbsp;</span>
                        <input type="radio" id="one" value="Teacher" v-model="userRole">
                        <label for="one"><span>Teacher </span></label>&nbsp;
                         <a class="vl"></a>
                        <input type="radio" id="two" value="Student" v-model="userRole">
                        <label for="two"><span>&nbsp;Student</span></label>
                </article>
            <input type="text" id="fullName" name="fullName" placeholder="Full Name*" v-model="fullName" >
            <input type="email" id="email" name="email" placeholder="E-mail*" v-model="email" >
            <input type="password" id="passWord" name="passWord" placeholder="Password*" v-model="password1" minlength="6" >
            <input type="password" id="passWordConfirmation" name="passWord" placeholder="Confirm Password*" v-model="password2">
            <input type="text" id="phone" name="phone" placeholder="Phone Number" v-model="phoneNumber">
            <select id="destination" name="country" @change="onChange($event)" v-model="key">
                <option value="0">Select your school level</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
            <article class="label">
            <input type="checkbox" name="agree" v-model="agree"><span>I have read and agree with the terms and conditions.</span>
            </article>
            <input type="submit" value="Save" @click.prevent="register()">
        </article>
    </div>
</template>

<script>
    export default {
        name: "register",
        data: function () {
            return{
                isNotRegistered: true,
                userRole:'',
                fullName:'',
                email: '',
                phoneNumber:'',
                password1:'',
                password2:'',
                key: '0',
                agree: false,
                errors: [],
                registrationStatus:'',
                validation:''
            }
        },
        methods: {
            onChange(event) {
                this.key = event.target.value;
            },
            emptyForm(){
                this.userRole='';
                this.fullName='';
                this.email= '';
                this.phoneNumber='';
                this.password1='';
                this.password2='';
                this.key= '0';
                this.agree= false;
            },
            async register() {
              const checkFields = await AuthServices.requiredFields({
                userRole: this.userRole,
                fullName: this.fullName,
                email: this.email,
                password1: this.password1,
                password2: this.password2

              });
              if (!checkFields.data.isFilled) {
                this.validation = checkFields.data.message;
              } else {
                const verifyEmail = await AuthServices.checkEmail({
                  email: this.email,
                });
                if (!verifyEmail.data.isValid) {
                  this.validation = verifyEmail.data.message;
                  this.email='';
                } else {
                  const verifyPass = await AuthServices.verifyPasswords({
                    password1: this.password1,
                    password2: this.password2
                  });
                  if (!verifyPass.data.isIdentical) {
                    this.validation = verifyPass.data.message;
                    this.password1='';
                    this.password2 = '';
                  } else {
                    const registerResponse = await AuthServices.register({
                      userRole: this.userRole,
                      fullName: this.fullName,
                      email: this.email,
                      password2: this.password2,
                      phoneNumber: this.phoneNumber,
                      schoolLevel: this.key
                    });
                    this.validation ='';
                    this.registrationStatus = registerResponse.data.message+'! welcome :'+registerResponse.data.users.fullName+'.';
                    this.emptyForm();
                    this.isNotRegistered = false;
                  }
                }

              }
            }
        },
    }
    import AuthServices from '../services/ApiServices';
</script>
<style scoped>
    input[type=text], input[type=email], input[type=password], input[type=checkbox], select, textarea, .label {
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
    p{
        font-family: Calibri, monospace;
        font-weight: bolder;
        color: #1b9b52;
    }
    #validation{
        font-family: Calibri, monospace;
        font-weight: normal;
        color: #f60334;
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
        margin-top: 2px;
        margin-bottom: 2px;
        background-color: #333333;
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
    /* Mobile */
    @media screen and (max-width: 400px) {

    }
    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {

    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
        .register {
            border: 1px solid #02b3b3;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.7);
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
        .label{
            border: none;
            background: none;
        }
    }
</style>