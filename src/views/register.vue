<template>

    <div>
        <section class="item3">
    <div class="register" >
        <h4>{{registrationDone}}</h4>
        <form name="form" @submit="newUserPost" method="post">
                <label>
                    <input type="radio" id="one" value="teacher" v-model="userRole">
                    <label for="one">I'm teacher</label>
                    <a class="vl"></a>
                    <input type="radio" id="two" value="student" v-model="userRole">
                    <label for="two">I'm student</label>
            </label>
            <input type="text" id="fullName" name="fullName" placeholder="Full Name" v-model="fullName">
            <input type="text" id="email" name="email" placeholder="E-mail" v-model="email">
            <input type="password" id="passWord" name="passWord" placeholder="Password" v-model="firstPassWord">
            <input type="password" id="passWordConfirmation" name="passWord" placeholder="Confirm Password" v-model="passWord">
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
            <input type="checkbox" name="agree" v-model="agree"><span>I have read and agree / agreed with the terms and conditions.</span>
            <input type="submit" name="submit" value="Save" >
        </form>
    </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "register",
        data: function () {
            return{
                userRole:'',
                fullName:'',
                email: '',
                phoneNumber:'',
                firstPassWord:'',
                passWord:'',
                key: '0',
                agree: false,
                registerFormValue: [],
                output:'',
                errors: [],
                registrationDone:'',

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
                this.firstPassWord='';
                this.passWord='';
                this.key= '0';
                this.agree= false;
            },
            getData(){
                if (this.userRole !=='' && this.fullName!=='' && this.email!=='' && this.passWord!=='' && this.key!=='0' && this.firstPassWord === this.passWord && this.agree===true){
                    this.registerFormValue.push(this.userRole, this.fullName, this.email, this.passWord, this.phoneNumber, this.key);
                    this.registrationDone= 'Welcome '+this.registerFormValue[1]+'!';
                }
            },
            newUserPost(e) {
                this.getData();
                e.preventDefault();
                let currentObj = this;
                this.axios.post('http://127.0.0.1:3000/api/users/', {
                                userRole:this.registerFormValue[0],
                                fullName: this.registerFormValue[1],
                                email: this.registerFormValue[2],
                                passWord: this.registerFormValue[3],
                                phoneNumber: this.registerFormValue[4],
                                level: this.registerFormValue[5]
                })
                    .then(function (response) {
                        currentObj.output = response.data;
                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });
                this.emptyForm();
            }
        },
        mounted() {
            fetch('http://127.0.0.1:3000/api/users/')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.users);
                    this.users = data.users;
                });
            console.log('Component mounted.');
        }
    }
</script>

<style scoped>
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
    h4{
        font-family: "Times New Roman", monospace;
        font-weight: bold;
        color: #3d8cb5;
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