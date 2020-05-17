<template>

    <div>
        <section class="item3">
    <div class="register" >
        <p>{{welcomeMessage}}</p>
        <p id="validation">{{validation}}</p>
        <article v-show="isNotRegistered">
                <label>
                    <input type="radio" id="one" value="teacher" v-model="userRole">
                    <label for="one"><span>I'm teacher</span></label>
                    <a class="vl"></a>
                    <input type="radio" id="two" value="student" v-model="userRole">
                    <label for="two"><span>I'm student</span></label>
            </label>
            <input type="text" id="fullName" name="fullName" placeholder="Full Name" v-model="fullName" required>
            <input type="email" id="email" name="email" placeholder="E-mail" v-model="email" required>
            <input type="password" id="passWord" name="passWord" placeholder="Password" v-model="password" minlength="6" required>
            <input type="password" id="passWordConfirmation" name="passWord" placeholder="Confirm Password" v-model="ConfirmPassword" minlength="6" required>
            <input type="text" id="phone" name="phone" placeholder="Phone Number" v-model="phoneNumber">
            <select id="destination" name="country" @change="onChange($event)" v-model="key" >
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
            <input type="checkbox" name="agree" v-model="agree"><span>I have read and agree / agreed with the terms and conditions.</span>
            <input type="submit" value="Save" @click.prevent="register()">
        </article>
    </div>
        </section>
    </div>
</template>

<script>
    import AuthServices from '../services/ApiServices';
    export default {
        name: "register",
        data: function () {
            return{
              isNotRegistered: true,
                userRole:'',
                fullName:'',
                email: '',
                phoneNumber:'',
                ConfirmPassword:'',
                password:'',
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
                this.ConfirmPassword='';
                this.password='';
                this.key= '0';
                this.agree= false;
            },
            async register() {
                  if (this.password === this.ConfirmPassword) {
                        const response = await AuthServices.checkEmail({
                          email: this.email,
                        });
                        if (!response.data.isValid){
                          this.validation = response.data.message ;
                        }else {
                              await AuthServices.register({
                                userRole: this.userRole,
                                fullName: this.fullName,
                                email: this.email,
                                password: this.ConfirmPassword,
                                phoneNumber: this.phoneNumber,
                                schoolLevel: this.key
                              });
                              this.validation ='';
                              this.welcomeMessage = 'Welcome ' + this.fullName + '!';
                              this.isNotRegistered = false;
                              this.emptyForm();
                        }

                  }else {
                          this.validation = 'Your passwords are not identical ';
                  }

            }
        },
    }
</script>

<style scoped>
    input[type=text], input[type=email], input[type=password], input[type=checkbox], select, textarea {
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
    p{
        font-family: "Times New Roman", monospace;
        font-weight: normal;
        color: #04d279;
    }
    #validation{
        font-family: "Times New Roman", monospace;
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