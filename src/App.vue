<template>
  <div id="app"  class="grid">
    <section class="item1">
      <div class="item1-body">
        <div class="logo-table">
          <div class="logo-box">
            <img src="./assets/logo.png" alt="Logo" class="logo-img">
            <span class="slag">DET SKA VARA KUL ATT PLUGGA!</span>
          </div>
          <div class="logout-box">
            <label><span>Hi, Halim Halim!</span></label>
            <label><a href="">[log out!]</a></label>
          </div>
        </div>
      </div>
    </section>

    <section class="item2">
      <div id="desktop-menu">
        <ul class="menu">
          <li><router-link to="/"> Quiz</router-link></li>
          <li><router-link to="/login">Sign in</router-link></li>
          <li><router-link to="/register">Sign up</router-link></li>
          <li><router-link to="/CreateNewQuiz">Rate us</router-link></li>
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
      <div class="item3-body">
        <router-view />
      </div>

    </section>
    <section class="item4">
      <div class="item4-body">
        <p>Copyright (c) 2020 by Aisha, Anton, Halim, Linus.</p>
      </div>
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
    grid-area: header;
  }

  .item2 {
    grid-area: menu;
  }

  .item3 {
    grid-area: sidebar;
    display:flex;
  }

  .item4 {
    grid-area: footer;
  }
  body{
    font-family: Calibri, monospace;
  }

  .login a {
    color: #02b3b3;
    text-decoration: none;
  }
  .login a:hover {
    color: #0b5b5b;
  }

  .item3-body{
    border: 3px solid #ccc;
    width: 100%;
    display: table;
    margin: auto;
  }
  .item1-body{
    border: 3px solid #ccc;
    width: 100%;
    display: table;
  }
  .logo-table{
    display: table-row;
  }
  .logo-box{
    display: table-cell;
    width: 20%;
    color: #02b3b3;
    font-family: Impact, monospace;
  }
  .logo-img{
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
  .logout-box{
    display: table-cell;
    width: 80%;
    color: #182423;
    font-family: Calibri, monospace;
  //font-size: medium;
    text-align: right;
    vertical-align: middle;
  }
  .item4-body{
    border: 3px solid #ccc;
    border-radius: 10px;
    display: inline-block;
    width: 100%;
  }
  .menuIcon{
    max-width: 30%;
    max-height: 30%;
    display: inline-block;
  }
  .slag{
    display: none;
  }
  #desktop-menu{
    display: none;
  }
  #mobil-menu{
    display: block;
  }
  button{
    margin-top: 5px;
    border: none;
    background: transparent;
    width: 40px;
    height: 40px;
    cursor: pointer;
    text-align: center;
  }

/* Menu Mobile & Desktop*/
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

  /* Mobile */
  @media screen and (max-width: 400px) {
  }
  /* Tablet */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .item3 {
      grid-area: sidebar;

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
    .item3-body{
      background: url('./assets/qui.jpg') no-repeat;
      background-size: 100% 100%;
      width: 60%;
      height: 500px;
    }
    .item1-body{
      display: inline-block;
      text-align: center;
      width: 60%;
    }
    .logo-box{
      width: 25%;
    }
    .logout-box{
      width: 75%;
      vertical-align: top;
    }
    .slag{
      display: block;
      color: #02b3b3;
      font-family: Impact, monospace;
      font-weight: normal;
    }
    #desktop-menu{
      display: inline-block;
      width: 60%;
    }
    #mobil-menu{
      display: none;
    }
    .item4-body{
      width: 60%;
    }
  }


</style>
