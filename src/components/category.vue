<template>
  <div class="category" >
    <router-link to="/mattequiz"><button class="btn">
      <img class="icon-desktop" src="../assets/icon/icons8-math-100.png" alt="math">
      <img class="icon-mobile" src="../assets/icon/icons8-math-50.png" alt="math" width="30px" height="30px">
    </button></router-link>
    <router-link to="/geographyquiz"><button class="btn">
        <img class="icon-desktop" src="../assets/icon/icons8-geography-100.png" alt="geo">
        <img class="icon-mobile" src="../assets/icon/icons8-geography-50.png" alt="geo" width="30px" height="30px">
      </button></router-link>
    <router-link to="/svenskaQuiz"><button class="btn">
      <img class="icon-desktop" src="../assets/icon/icons8-scandinavian-100.png" alt="sve">
<<<<<<< HEAD
      <img class="icon-mobile" src="../assets/icon/icons8-scandinavian-50.png" alt="sve" width="30px" height="30px">
    </button>
    <button class="btn">
      <img class="icon-desktop" src="../assets/icon/icons8-great-britain-100.png" alt="eng">
      <img class="icon-mobile" src="../assets/icon/icons8-great-britain-50.png" alt="eng" width="30px" height="30px">
    </button>
=======
      <img class="icon-mobile" src="../assets/icon/icons8-scandinavian-50.png" alt="sve">
    </button></router-link>
    <router-link to="/engelskaQuiz"><button class="btn">
      <img class="icon-desktop" src="../assets/icon/icons8-great-britain-100.png" alt="eng">
      <img class="icon-mobile" src="../assets/icon/icons8-great-britain-50.png" alt="eng">
    </button></router-link>
>>>>>>> d2268fe82f15c031587409570b91ca7c469a9143
  </div>
</template>

<script>
  export default {
    name: "category"
  }
</script>

<style scoped>
  .category{
  }
  .btn{
    border: 3px solid rgb(0, 10, 10);
    margin-bottom: 5px;
    width: 99%;
    background-color: #384e4e;
    font-family: "Impact", monospace;
    font-size: 20px;
    color: #02b3b3;
    height: 60px;
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

  /* Mobile */
  @media screen and (max-width: 400px) {
  }
  /* Tablet */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
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

  }



</style>