<template>
  <div id="app"  class="grid">
    <section class="item1">
      <div class="item1-body">
        <div class="navbar">
            <div class="logo-box">
              <img src="./assets/logo.png" alt="Logo" class="logo-img">
            </div>
          <a><router-link to="/"> QUIZ</router-link></a>
          <a><router-link to="/register">REGISTER</router-link></a>
          <a><router-link to="/aboutus">ABOUT US</router-link></a>
          <div class="dropdown">
            <button class="dropbtn">
              MY PAGES
              <img src="./assets/icon/down.png" alt="down">
            </button>
            <div class="dropdown-content">
              <div class="header">

              </div>
              <a><router-link to="/MySpace">My Profile</router-link></a>
              <a><router-link to="/DispoUsers">Manage All Users</router-link></a>
              <a><router-link to="/DispoQuiz">Manage All Quiz</router-link></a>
              <a><router-link to="/CreateNewQuiz">Create New Quiz</router-link></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="item2">
    </section>
    <section class="item3">
      <div class="item3-body">
        <div class="body-login">
          <div class="login-cell">
            <table class="center">
              <tr>
                <td><span>{{message}}</span><span class="error">{{errorMessage}}</span> &nbsp;<input type="button" @click="submitLogout" value="logout" v-if="isLogged"></td>
              </tr>
              <tr>
                <td v-if="!isLogged"><input value="email" type="email" name="user-log" v-model="email" placeholder="Email" >&nbsp;<input value="password" type="password" name="user-log" v-model="password" placeholder="Password">&nbsp;<input type="button" @click="submitForm()" value="login"></td>
              </tr>
              <tr>
                <td v-if="!isLogged"><span>Har inget konto? </span><a><router-link to="/register">Registrera!</router-link></a></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="body-routers">
          <router-view />
        </div>
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
  import AuthServices from './services/ApiServices';
  export default {
    name: "App",
    data: function () {
      return {
        email:'',
        password:'',
        message:'',
        errorMessage:'',
        isLogged: false,
        userID: 0,
        user_Role:'',
      }
    },
      methods: {
        mobilMenu () {
          const x = document.getElementById("links");
          if (x.style.display === "block") {
            x.style.display = "none";
          } else {
            x.style.display = "block";
          }
        },
        async submitForm() {
          const response = await AuthServices.login({
            email: this.email,
            password: this.password
          });
          if (response.data.isSessionCreated){
            this.errorMessage ='';
            const jsonObject = '{"message": "'+response.data.message+'", "fullName": "'+response.data.fullName+'", "userRole": "'+response.data.userRole+'", "userId": "'+response.data.userId+'"}';
            let obj = JSON.parse(jsonObject);
            let jsonUser_serialized = JSON.stringify(obj);
            sessionStorage.setItem("userLogged", jsonUser_serialized);
            this.message= JSON.parse(sessionStorage.getItem('userLogged')).message+", "+JSON.parse(sessionStorage.getItem('userLogged')).fullName+"!";
            this.isLogged = true;
            this.userID= parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId);
            this.user_Role= JSON.parse(sessionStorage.getItem('userLogged')).userRole;
            this.email = '';
            this.password = '';
          }
          else {
            this.message='';
            this.errorMessage = response.data.message;
            this.email = '';
            this.password = '';
          }
        },
        async submitLogout () {
          const response = await AuthServices.logout({
           sessionStatus: this.isLogged,
          });
          sessionStorage.clear();
          this.isLogged = false;
          this.userID= 0;
          this.user_Role= '';
          this.errorMessage ='';
          this.message = response.data.message;
          //setTimeout(this.message, 3000);
        },

      },
    mounted(){
        if (parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId) && parseInt(JSON.parse(sessionStorage.getItem('userLogged')).userId)>=1){
          this.isLogged = true;
          this.message= JSON.parse(sessionStorage.getItem('userLogged')).message+", "+JSON.parse(sessionStorage.getItem('userLogged')).fullName+"!";
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
            "sidebar sidebar sidebar sidebar"
            "footer footer footer footer"
            "menu menu menu menu";
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
  .error{
    color: red;
  }
  .login a {
    color: #02b3b3;
    text-decoration: none;
  }
  .login a:hover {
    color: #0b5b5b;
  }

  .item3-body{
    border: 3px solid #cccc;
    width: 100%;
    display: table;
    margin: auto;
  }
span{
  font-family: Calibri, monospace;
  font-weight: normal;
  color: wheat;
}
  .body-login{
    display: table-row;
    height: auto;
  }
  .login-cell{
    border-bottom: 3px solid #cccc;
    height: 50px;
    width: 100%;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    background: rgba(0, 0, 0, 0.9);
  }
  .body-routers{
    display: table-row;
    text-align: center;
  }
a {
  color: #0b5b5b;
  text-decoration: none;
}
a:hover {
  color: #02b3b3;
}
.center {
  width: 100%;
  font: inherit;
  border-collapse: collapse;
  color: rgba(6, 25, 45, 0.6);
}

.center th {
  text-transform: uppercase;
  text-align: center;
  background: #44475C;
  color: #FFF;
  padding-top: 5px;
}

.center td {
  padding-top: 5px;
  text-align: center;
}


  .item1-body{
    width: 100%;
    //display: table;
    border: 3px solid #ccc;
  }
  .logo-box{
    float: left;
    overflow: hidden;
  }
  .logo-img{
    max-width: 50%;
    max-height: 50%;
    //display: block;
  }
  .item4-body{
    border: 3px solid #ccc;
    display: inline-block;
    width: 100%;
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
* {
  box-sizing: border-box;
}
.navbar {
  overflow: hidden;
  background-color: #0f122d;
  font-family: Calibri, monospace;
  font-size: large;
}

.navbar a {
  float: right;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.dropdown {
  float: right;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 16px;
  width: 148px;
}

.navbar a:hover, .dropdown:hover, .dropbtn:hover {
  background-color: #ddd;
  color: black;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}
.header {
  background: #0a7272;
  padding-top: 5px;
  padding-bottom: 5px;
  color: white;
}

.dropdown:hover .dropdown-content {
  display: block;
}
/* finish here */
input[type=button] {
  background-color: #222222;
  font-family: "Times New Roman", monospace;
  font-weight: bold;
  color: #02b3b3;
  border: 1px solid rgb(7, 172, 172);
  border-radius: 4px;
  width: 50%;
  height: 30px;
  cursor: pointer;
}
input[type=button]:hover {
  background-color: #e9e608;
  color: black;
}
input[type=email], input[type=password] {
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
  height: 30px;
  cursor: pointer;
  width: 49%;
}
.md-toolbar + .md-toolbar {
  margin-top: 16px;
}
  /* Mobile */
  @media screen and (max-width: 400px) {
  }
  /* Tablet */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .item3 {
      grid-area: sidebar;

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
      margin-top: 5px;
    }
    .logo-box{
      float: left;
      overflow: hidden;
    }
    .logo-img{
      padding-left: 5px;
      max-width: 50%;
      max-height: 150px;
      display: block;
    }
    .item4-body{
      width: 60%;
      background-color: #f3f3f3;
    }
    input[type=button] {
      width: 50px;
      height: 30px;
    }
    input[type=email], input[type=password] {
      width: 200px;
    }
  }


</style>
