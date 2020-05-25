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
    name: "about"
  }
</script>


<style scoped>
  .about{
    width: 70%;
    margin: 0 auto;
  }
  p{
    text-align: left;
  }
  .iths{
          padding-top: 15px;
          width: 169px;
          height: 220px;
          display: flow;


  }

</style>
