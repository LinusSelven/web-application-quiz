<template>
  <div id="app"  class="grid">

    <section class="item1">
      <div class="logo-box">
      <img src="./assets/logo.png" alt="Logo" class="logo-img">
      <span class="slag">DET SKA VARA KUL ATT PLUGGA!</span>
      </div>
    </section>

    <section class="item2">
      <div id="desktop-menu1">
        <ul class="menu">
          <li><router-link to="/"> Quiz</router-link></li>
          <li><router-link to="/login">Sign in</router-link></li>
          <li><router-link to="/register">Sign up</router-link></li>
          <li><router-link to="/">Rate us</router-link></li>
          <li><router-link to="/aboutus">About us</router-link></li>
        </ul>
      </div>
      <div id="mobil-menu">
        <div class="topNav">
          <a class="active">Quiz</a>
          <div id="links">
            <a href="/register">Register</a>
            <a href="#">About us</a>
            <a href="#">Rate us</a>
            <a href="#">Sign in</a>
          </div>
          <a href="javascript:void(0);" class="icon" @click="mobilMenu">
            <img src="./assets/icons.png" alt="menu" class="menuIcon">
          </a>
        </div>
      </div>
    </section>
    <section class="item3">
    <router-view />
    </section>
    <section class="item4">
      <p>Copyright (c) 2020 by Aisha, Anton, Halim, Linus.</p>
    </section>

   </div>
</template>
<script>
  export default {
    name: "App",
    data: function () {
      return {
      }
    },
      methods: {
        mobilMenu() {
          const x = document.getElementById("links");
          if (x.style.display === "block") {
            x.style.display = "none";
          } else {
            x.style.display = "block";
          }
      }
    }

  }
</script>

<style>
  /* mobil*/
  .topNav {
    overflow: hidden;
    background-color: #333;
    position: relative;
    font-family: "Times New Roman", monospace;
    font-weight: bold;
  }

  .topNav #links {
    display: none;
  }

  .topNav a {
    color: white;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    display: block;
    border-bottom: 1px solid rgba(255, 255, 255, 0.83);
  }

  .topNav a.icon {
    background: dimgray;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }

  .topNav a:hover {
    background-color: rgba(250, 242, 82, 0.99);
    color: dimgray;
  }

  .active {
    background-color: #02b3b3;
    color: whitesmoke;
  }
  /*desktop*/
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: dimgray;
  }
  li {
    float: left;
    font-family: "Times New Roman", monospace;
    font-weight: bold;
    width: 20%;
  }

  li a {
    display: block;
    color: wheat;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.83);
    cursor: pointer;
  }

  li a:hover:not(.active) {
    background-color: rgba(250, 242, 82, 0.99);
    color: dimgray;
  }

  .active {
    background-color: #02b3b3;
    color: whitesmoke;
  }
/* style*/
  [class^="item"] {
    text-align: center;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, auto);
    grid-template-areas:
            "header header header header"
            "menu menu menu menu"
            "sidebar sidebar sidebar sidebar"
            "footer footer footer footer";
    grid-auto-flow: dense;
    grid-gap: 5px;
  }
  .item1 {
    padding: 10px;
    text-align: left;
    grid-area: header;
    height: auto;
  }

  .item2 {
    border: none;
    grid-area: menu;
  }

  .item3 {
    //padding: 10px 5px 10px 5px;
    grid-area: sidebar;
    background: url('./assets/qui.jpg') no-repeat;
    background-size: 100% 100%;
  }

  .item4 {
    grid-area: footer;
  }
  body{
    font-family: Calibri, monospace;
  }
  section{
    color: black;
    border: 3px solid #ccc;
    border-radius: 10px;
    text-align: center;
    background-color: rgba(239, 236, 236, 0.14);
  }
  .logo-box{
    width: 100px;
    color: #02b3b3;
    font-family: Impact, monospace;
  }
  .logo-img{
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
  .menuIcon{
    max-width: 30%;
    max-height: 30%;
    display: inline-block;
  }
  .slag{
    display: none;
  }
  #desktop-menu1{
    display: none;
  }
  #mobil-menu{
    display: block;
  }
  .underConstruction{
    text-align: center;
  }

  .login a {
    color: #02b3b3;
    text-decoration: none;
  }
  .login a:hover {
    color: #0b5b5b;
  }
  /* Mobile */
  @media screen and (max-width: 400px) {
  }
  /* Tablet */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .item3 {
      padding: 10px 5px 10px 5px;
      grid-area: sidebar;
      background: url('./assets/qui.jpg') no-repeat;
      background-size: 100% 100%;
    }
    .logo-box{
      width: 200px;
      color: #02b3b3;
      font-family: Impact, monospace;
    }
    .slag{
      display: block;
    }
  }
  /* Desktop */
  @media screen and (min-width: 1025px) {
    .item3{
      padding: 10px 10px 10px 10px;
    }
    .logo-box{
      width: 200px;
      color: #02b3b3;
      font-family: Impact, monospace;
    }
    .slag{
      display: block;
      color: #02b3b3;
      font-family: Impact, monospace;
      font-weight: normal;
    }
    #desktop-menu1{
      display: block;
    }
    #mobil-menu{
      display: none;
    }
  }
  /*    */


</style>
