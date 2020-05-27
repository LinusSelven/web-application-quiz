<template>
  <div class="about">
    <img src="../assets/iths.png" alt="iths" class="iths">



    <h3> Vi studerar till Java utvecklare i IT-HÖGSKOLA i Göteborg.</h3>
    <p>
      Vi är expert på världens största programmeringsspråk Java men kan också databashantering och webbutveckling som gör oss till fullstack-utvecklare.    </p>
    <p>
      <b>SkolQuizzen</b> är en hemsida för elever i grundskola som kan studera Geografi, Matte, Svenska och  Engelska  hemifrån.
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
    padding-top: 15px;
    width: 169px;
    height: 220px;
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
    background: rgba(0, 0, 0, .7);
    display: inline-block;
    text-align: center;
    padding-left: 50px;
    padding-right: 50px;
  }
  h2, h3{
    font-size: large;
    color: wheat;
  }
  p{
    color: wheat;
    text-align: left;

  }
  /* Mobile */
  @media screen and (max-width: 400px) {
  }
  /* Tablet */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
  }
  /* Desktop */
  @media screen and (min-width: 1025px) {
    .about{
      display: table-cell;
      text-align: center;
      vertical-align: top;
      background: rgba(0, 0, 0, 0.8);
      width: 100%;

    }
    h1{
      padding: 13px;
    }
  }


</style>