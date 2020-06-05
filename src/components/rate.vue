<template>
            <div class="divRate">
                <h1>RATE OUR WEBSITE</h1>
                <form>
                    <select id="stars" name="stars" @change="onChange($event)" v-model="value">
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                    <textarea placeholder="Your text here ..." v-model="text"></textarea>
                    <button type="button" @click="rateUs">Confirm</button>
                </form>

                 <table id="tbl-rate" class="tbl-rate">
                    <tr><td>
                        <span>
                                            <img src="../assets/on.png" alt="On">
                                            <img src="../assets/on.png" alt="On">
                                            <img src="../assets/on.png" alt="On">
                                            <img src="../assets/off.png" alt="Off">
                                            <img src="../assets/off.png" alt="Off">
                        </span>
                        <h5>Halim Dakir</h5>
                        <p>Thanks for you.</p>
                    </td></tr>
                 </table>
                <p></p>
            </div>

</template>

<script>
    export default {
        name: "rate",
      data: function () {
          return{
            publicPath: process.env.BASE_URL,
                text:'',
                value:5,
          }

      },
      methods:{
        onChange(event) {
          this.value = parseInt(event.target.value);
        },
        getImgOff: function () {
          return require('../assets/off.png')
        },
        getImgOn: function () {
          return require('../assets/on.png')
        },
        rateUs(){
          let formName = JSON.parse(sessionStorage.getItem('userLogged')).fullName;
          let formText = this.text;
          if (formName && formText !=='') {
            const amount = this.value
            const star_off = '<img :src="require(\'../assets/off.png\')" alt="off">'
            const star_on = '<img :src="require(\'../assets/on.png\')" alt="on">'
            let amount_star_off = '';
            let amount_star_on = '';

            for (let i = 0; i < (5 - amount); i++) {
              amount_star_off += star_off;
            }
            for (let j = 0; j < amount; j++) {
              amount_star_on += star_on;
            }
            console.log(amount_star_off);
            console.log(amount_star_on);

            const rate_final = '<span>' + amount_star_on + amount_star_off + '</span>';
            const name = '<h5>' +formName+ '</h5>';
            const text_rate = '<p>' +formText+ '</p>';

            const inRow = rate_final + name + text_rate
            const table = document.getElementById('tbl-rate')
            const row = table.insertRow(0)
            const cell = row.insertCell(0)
            cell.innerHTML = inRow;

            //Empty inputs
            this.text = '';
            this.value = 5;
          }
        },
      }
    }
</script>

<style scoped>
    .divRate {
        display: table-cell;
        text-align: center;
        vertical-align: top;
        background: rgba(0, 0, 0, 0.7);
    }
    form{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    h1{
        font-family: Calibri, monospace;
        color: wheat;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 5px;
        margin: auto;
    }
    .tbl-rate {
        width: 100%;
        padding: 5px;
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
        height: 40px;
        cursor: pointer;
    }

    .tbl-rate td, .tbl-rate th {
        text-align: left;
        //color: #181818;
        //border: 1px solid rgb(7, 172, 172)
    }

    .tbl-rate tr:nth-child(even) {
    }
    .tbl-rate h5{
        font-weight: bold;
        color: orangered;
    }
    button{
        margin-top: 2px;
        margin-bottom: 2px;
        background-color: #333333;
        font-family: Calibri, monospace;
        font-weight: bold;
        color: #02b3b3;
        border: 1px solid rgb(7, 172, 172);
        width: 100%;
        height: 40px;
        cursor: pointer;
    }
    button:hover{
        background-color: orangered;
        color: black;
        border: 1px solid black;
    }
    input[type=text], select, textarea {
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
        width: 100%;
        height: 40px;
        cursor: pointer;
    }
    textarea{
        height: 100px;
    }

    ::-webkit-input-placeholder { /* Edge */
        color: #fced62;
    }
    :-ms-input-placeholder { /* Internet Explorer */
        color: #fced62;
    }
    ::placeholder {
        color: wheat;
    }

    #errorMessage {
        color: wheat;
        /*  background-image: url('../image/warning.png');
        background-repeat: no-repeat;
        background-position: 2px 14px;*/
    ;
    }
    #errorMessage.warning {
        /*    background-image: url('../image/warning.png'); */
    }
    p{
        font-family: Calibri, monospace;
        font-weight: normal;
        color: wheat;
    }
    table p{
        font-family: 'Oswald', 'Futura', sans-serif;
        font-size: 12px;
        color: wheat;
    }
    h5{
        color: wheat;
    }


    /* Mobile */
    @media screen and (max-width: 400px) {
    }
    /* Tablet */
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    }
    /* Desktop */
    @media screen and (min-width: 1025px) {
        .divRate {
            display: table-cell;
            text-align: center;
            vertical-align: top;
            background: rgba(0, 0, 0, 0.7);
        }
        input[type=text], select, textarea {
            background: rgba(5, 5, 5, 0.5);
            width: 90%;
        }
        button {
            width: 100px;
        }
        table {
            background: rgba(0, 0, 0, 0.7);
            width: 90%;
            margin: 0 auto;

        }
    }

</style>