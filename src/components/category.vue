<template>
  <div class="category" >
    <router-link to="/mattequiz"><button class="btn">Matematik</button></router-link>
    <router-link to="/geographyquiz"><button class="btn">Geografi</button></router-link>
    <button class="btn">Svenska</button>
    <button class="btn">Engelska</button>
  </div>
</template>

<script>
  export default {
    name: "category"
  }
</script>

<style scoped>
  .category{
    text-align: center;
    margin-left:auto;
    margin-right:auto;
  }
  .btn{
    border: 1px solid rgb(7, 172, 172);
    margin-bottom: 5px;
    width: 100%;
    background-color: #333333;
    font-family: "Impact", monospace;
    font-size: 20px;
    color: #02b3b3;
    height: 60px;
  }
  .btn:hover {
    border: 1px solid rgb(0, 3, 3);
    background-color: #0a7272;
    color: wheat;
    cursor: pointer;
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
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    .btn{
      width: 48.5%;
      height: 200px;
      margin: 5px;
      background-color: #333333;
    }
  }



</style>