<template>
    <div class="myPage">
        <div class="showData" id="showData"></div>
        <input type="file" id="upload" name="upload" accept="image/*" placeholder="Select image">
        <input type="submit" value="Save" @click="saveProfileimg()">
        <div><p>Namn :</p> <input value="" type="" name="" placeholder="Anton">
        </div>
        <div><p>Email :</p> <input value="" type="" name="" placeholder="anton@gmail.com">
        </div>
        <div><p>Användare :</p>
            <input type="radio" id="one" value="Teacher" v-model="userRole">
            <label for="one"><span>&nbsp;Teacher </span></label>
            <a class="vl"></a>
            <input type="radio" id="two" value="Student" v-model="userRole">
            <label for="two"><span>&nbsp;Student</span></label>
        </div>
        <div class="q-answer">
            <button class="q-btn">Quiz Stats</button>
            <button class="q-btn" @click="saveChanges()">Save changes</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data: function () {
            return {}
        },
        methods: {

            saveProfileimg: function () {
                /* kod för att spara en bild */
            },
            saveChanges: function () {

            }

        }
    }
    //import AuthServices from '../services/ApiServices';
</script>

<style scoped>
    .center {
        margin: 0 auto;
    }

    .login a {
        color: #02b3b3;
        text-decoration: none;
    }

    .login a:hover {
        color: #0b5b5b;
    }

    #errorMsg {
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

    label {
        padding: 5px;
        margin-top: 2px;
        margin-bottom: 2px;
        text-align: center;
        width: 100%;
    }

    .q-btn {
        width: 100%;
        margin-right: 5px;
        margin-top: 5px;
        background-color: #333333;
        font-family: "Times New Roman", monospace;
        font-size: 20px;
        color: wheat;
        height: 30px;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
    }
    .q-answer {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .q-btn:hover {
        background-color: #e9e608;
        color: black;
        cursor: pointer;
    }

    .vl {
        border-left: 2px solid dimgray;
        height: 100%;
    }

    input[type=checkbox] {
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
    p{
        font-family: "Times New Roman", monospace;
        font-size: 20px;
        color: wheat;
        height: 30px;

    }

    span {
        font-family: Calibri, monospace;
        font-weight: normal;
        color: wheat;
    }

    .myPage {
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
        color: black;
    }

    /* Mobile */
    @media screen and (max-width: 400px) {
    }

    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    }

    /* Desktop */
    @media screen and (min-width: 1025px) {
        .myPage {
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