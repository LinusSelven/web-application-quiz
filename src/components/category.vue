<template>
  <div class="category" >
    <router-link to="/mattequiz"><button class="btn">
      <img class="icon-desktop" src="../assets/icon/icons8-math-100.png" alt="math">
      <img class="icon-mobile" src="../assets/icon/icons8-math-50.png" alt="math" width="30px" height="30px">
      <div>MATEMATIK</div>
    </button></router-link>

    <router-link to="/geographyquiz"><button class="btn">
        <img class="icon-desktop" src="../assets/icon/icons8-geography-100.png" alt="geo">
        <img class="icon-mobile" src="../assets/icon/icons8-geography-50.png" alt="geo" width="30px" height="30px">
      <div>GEOGRAFI</div>
      </button></router-link>

    <router-link to="/svenskaQuiz"><button class="btn">
      <img class="icon-desktop" src="../assets/icon/icons8-scandinavian-100.png" alt="sve">
      <img class="icon-mobile" src="../assets/icon/icons8-scandinavian-50.png" alt="sve" width="30px" height="30px">
      <div>SVENSKA</div>
    </button></router-link>

    <router-link to="/engelskaQuiz"><button class="btn">
      <img class="icon-desktop" src="../assets/icon/icons8-great-britain-100.png" alt="eng" >
      <img class="icon-mobile" src="../assets/icon/icons8-great-britain-50.png" alt="eng" width="30px" height="30px">
      <div>ENGELSKA</div>
    </button></router-link>
  </div>
</template>

<script>
  export default {
    name: "category",
    data: function () {
      return{
      }
    },
    methods: {
      SubjectName(){
        document.addEventListener("mouseover", myFunction);
        function myFunction() {
          document.getElementById("math").innerHTML += "Moused over!<br>"
        }

      }
    }
  }
</script>

<style scoped>
  .category {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    background: rgba(0, 0, 0, 0.7);
  }
  h1{
    font-family: Calibri, monospace;
    color: wheat;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 5px;
    margin: auto;
  }
  .btn{
    position: relative;
    margin-right: 10px;
    border: 3px solid rgb(0, 10, 10);
    margin-bottom: 5px;
    width: 99%;
    background-color: #0f122d;
    font-family: Calibri, monospace;
    font-size: larger;
    font-weight: bold;
    color: #02b3b3;
    height: 40px;
    text-align: center;
  }
  .btn:hover {
    border: 3px solid #0a7272;
    background-color: #000000;
    color: wheat;
    cursor: pointer;
  }
  .icon-mobile{
    display: inline-block;
  }
  .icon-desktop{
   display: none;
  }


  /* Child Text Container */
  .btn div{
    bottom: 0;
    left: 0;
    position: absolute;
    background: black;
    color: #02b3b3;
    margin: auto;
    font-family: sans-serif;
    opacity: 0;
    visibility: hidden;
    -webkit-transition: visibility 0s, opacity 0.5s linear;
    transition: visibility 0s, opacity 0.5s linear;
  }

  /* Hover on Parent Container */
  .btn:hover{
    cursor: pointer;
  }

  .btn:hover div{
    width: 200px;
    padding: 4px 4px;
    visibility: visible;
    opacity: 0.6;
  }

  /* Mobile */
  @media screen and (max-width: 400px) {
  }
  /* Tablet */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .btn{
      height: 60px;
    }
    /* Child Text Container */
    .btn div{
      bottom: 0;
      left: 0;
      position: absolute;
      background: black;
      color: #02b3b3;
      margin: auto;
      font-family: sans-serif;
      opacity: 0;
      visibility: hidden;
      -webkit-transition: visibility 0s, opacity 0.5s linear;
      transition: visibility 0s, opacity 0.5s linear;
    }

    /* Hover on Parent Container */
    .btn:hover{
      cursor: pointer;
    }

    .btn:hover div{
      width: 200px;
      padding: 15px 10px;
      visibility: visible;
      opacity: 0.6;
    }
  }
  /* Desktop */
  @media screen and (min-width: 1025px) {
    .category {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      background: rgba(0, 0, 0, 0.7);
    }
    .btn{
      width: 20%;
      height: 200px;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 10px;
    }
    .icon-mobile{
      display: none;
    }
    .icon-desktop{
      display: inline-block;
    }
    /* Child Text Container */
    .btn div{
      bottom: 0;
      right: 0;
      position: absolute;
      background: black;
      color: #02b3b3;
    //margin-bottom: 5px;
      font-family: sans-serif;
      opacity: 0;
      visibility: hidden;
      -webkit-transition: visibility 0s, opacity 0.5s linear;
      transition: visibility 0s, opacity 0.5s linear;
    }

    /* Hover on Parent Container */
    .btn:hover{
      cursor: pointer;
    }

    .btn:hover div{
      width: 100%;
      padding: 8px 0;
      visibility: visible;
      opacity: 0.6;
    }

  }



</style>