<template>
  <div>
  <section class="item3">
  <div class="category" >

    <router-link to="/mattequiz"><button class="btn">Matematik</button></router-link>
    <router-link to="/geographyquiz"><button class="btn">Geografi</button></router-link>
    <button class="btn">Svenska</button>
    <button class="btn">Engelska</button>

  </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "category"
  }
</script>

<style scoped>
  .item3 {
    padding: 10px 5px 10px 5px;
    grid-area: sidebar;
  }
  .category{
    text-align: center;
    margin-left:auto;
    margin-right:auto;
  }
  .btn{
    width: 100%;
    background-color: #333333;
    font-family: "Impact", monospace;
    font-size: 20px;
    color: #02b3b3;
    height: 100px;
  }
  .btn:hover {
    background-color: #0b5b5b;
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
    .item3{
      padding: 10px 10px 10px 10px;
    }
    .btn{
      width: 40%;
      height: 250px;
      background-color: #333333;
    }
  }



</style>