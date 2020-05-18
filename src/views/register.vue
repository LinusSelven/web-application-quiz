<template>

    <div>
        <section class="item3">
    <div class="register" >
        <p>{{welcomeMessage}}</p>
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
            <input type="text" id="fullName" name="fullName" placeholder="Full Name*" v-model="fullName" required>
            <input type="email" id="email" name="email" placeholder="E-mail*" v-model="email" required>
            <input type="password" id="passWord" name="passWord" placeholder="Password*" v-model="password" minlength="6" required>
            <input type="password" id="passWordConfirmation" name="passWord" placeholder="Confirm Password*" v-model="confirmPassword" minlength="6" required>
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
            <input type="checkbox" name="agree" v-model="agree"><span>I have read and agree / agreed with the terms and conditions.</span>
            </article>
            <input type="submit" value="Save" @click.prevent="register()">
        </article>
    </div>
        </section>
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
                password:'',
                confirmPassword:'',
                key: '0',
                agree: false,
                errors: [],
                welcomeMessage:'',
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
                this.password='';
                this.confirmPassword='';
                this.key= '0';
                this.agree= false;
            },
            async register() {
              const checkFields = await AuthServices.requiredFields({
                userRole: this.userRole,
                fullName: this.fullName,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword

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
                    password: this.password,
                    confirmPassword: this.confirmPassword
                  });
                  if (!verifyPass.data.isIdentical) {
                    this.validation = verifyPass.data.message;
                    this.password='';
                    this.confirmPassword = '';
                  } else {
                    await AuthServices.register({
                      userRole: this.userRole,
                      fullName: this.fullName,
                      email: this.email,
                      password: this.confirmPassword,
                      phoneNumber: this.phoneNumber,
                      schoolLevel: this.key
                    });
                    this.validation ='';
                    this.welcomeMessage = 'Welcome ' + this.fullName + '!';
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
        border: 1px solid rgb(0, 31, 31);
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
        background: blanchedalmond;
        color: dimgray;
        font-family: Calibri, monospace;
        font-weight: bold;
        width: 100%;
        height: 40px;
    }
    p{
        font-family: Calibri, monospace;
        font-weight: normal;
        color: #04d279;
    }
    #validation{
        font-family: Calibri, monospace;
        font-weight: normal;
        color: #cf042d;
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
        font-family: Calibri, monospace;
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
        font-family: Calibri, monospace;
        font-weight: bolder;
        color: #818181;
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
    /* Mobile */
    @media screen and (max-width: 400px) {

    }
    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {

    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
        .register {
            width: 60%;
        }
    }
</style>