<template>
    <div class="createQuiz">
    <p>{{registrationStatus}}</p>
    <p id="validation">{{validation}}</p>
    <article >
        <select id="destination" name="country">
            <option value="0">Select The Subject</option>
            <option value="1">Geografi</option>
            <option value="2">Matematik</option>
            <option value="3">Svenska</option>
            <option value="4">Engelska</option>
        </select>
        <input type="text" id="question" name="question" placeholder="The Question*">
        <input type="text" id="answer1" name="answer1" placeholder="Answer 1*" >
        <input type="text" id="answer2" name="answer2" placeholder="answer 2*">
        <input type="text" id="answer3" name="answer3" placeholder="answer 3*">
        <input type="text" id="correctAnswer" name="correctAnswer" placeholder="Correct answer*" >
        <label for="img">Select image:</label>
        <input type="file" id="img" name="img" accept="image/*">
        <input type="submit" value="Save" >
    </article>
</div>
    
</template>

<script>
  export default {
    name: 'CreateNewQuiz'
  }
</script>

<style scoped>
    input[type=text], input[type=email], input[type=password], input[type=checkbox], input[type=checkbox],select, textarea, label {
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

    .createQuiz {
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
        .createQuiz {
            border: 1px solid #02b3b3;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px;
            width: 60%;
        }
        input[type=text], input[type=email], input[type=password], select, textarea, label {
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
        label{
            border: none;
            background: none;
        }
    }
</style>