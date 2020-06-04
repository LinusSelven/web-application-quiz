<template>
  <div class="about">
    <h1>ABOUT US</h1><br>
    <img src="../assets/viral.gif" alt="iths" class="iths">
    <h3> Vi studerar till Java utvecklare i IT-HÖGSKOLA i Göteborg</h3>
    <p><b>SkolQuizzen</b> är en hemsida för elever i grundskola som kan studera Geografi, Matte, Svenska och  Engelska  hemifrån.
      <br/>
      I SkolQuizen i grupp utvecklar vi en webbapplikation i form av ett Quiz   där vi gör en förstudie och planering för att därefter genomföra ett
      projekt med<b> agila metoder </b>där vi utgår från<b> Scrum</b>. Webbapplikationen görs med<b> HTML, CSS,
      Javascript, vue</b> och en backend i<b> node.js med SQLite</b> som databas.
    </p>

  </div>
</template>

<script>
  export default {
    name: "About",
  }
</script>


<style scoped>

  img{
    border-radius: 10px;
    width: 500px;
    height: 300px;
    display: flow;
  }
  h1{
    background: rgba(0, 0, 0, 0.9);
    font-family: "Nirmala UI Semilight", monospace;
    font-size: x-large;
    color: wheat;
    border-bottom: 1px solid black;
    margin: 0;
  }


  .about{
    display: table-cell;
    text-align: center;
    vertical-align: top;
    background: white;
    padding-bottom: 10px;
  }
  h2, h3{
    font-size: large;
    text-align: justify-all;
    //color: wheat;
    color: #0f122d;

  }
  h1{
    font-family: Calibri, monospace;
    color: wheat;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 5px;
    margin: auto;
  }
  p{
    color: #0f122d;
    //color: wheat;
    text-align: justify-all;
    margin: auto;

  }
  .iths{
    margin: auto;
  }
  /* Mobile */
  @media screen and (max-width: 400px) {
  }
  /* Tablet */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .about{
      display: table-cell;
      text-align: center;
      vertical-align: top;
      background: white;
    }
  }
  /* Desktop */
  @media screen and (min-width: 1025px) {
    .about{
      display: table-cell;
      text-align: center;
      vertical-align: top;
      background: white;
    }
    h1{
      padding: 13px;
    }
  }


</style>