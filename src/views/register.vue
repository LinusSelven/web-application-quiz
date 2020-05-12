<template>

    <div>
        <section class="item3">
    <div class="register" >
        <form name="form"  method="post">
            <label>
                <input type="radio" id="teacher" name="teacher"><span>I'm teacher</span>
                <a class="vl"></a>
                <input type="radio" id="student" name="student"><span>I'm student</span>
            </label>
            <input type="text" id="fullName" name="fullName" placeholder="Full Name">
            <input type="text" id="email" name="email" placeholder="E-mail">
            <input type="text" id="phone" name="phone" placeholder="Phone Number" />
            <input type="password" id="passWord" name="passWord" placeholder="Password" />
            <input type="password" id="passWordConfirmation" name="passWord" placeholder="Confirm Password" />
            <select id="destination" name="country">
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
            <input type="checkbox" id="myCheck" name="agree"><span>I have read and agree / agreed with the terms and conditions.</span>
            <input type="submit" name="submit" value="Save">
        </form>
    </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "register"
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