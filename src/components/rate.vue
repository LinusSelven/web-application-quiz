<template>



            <div id="div_rate" class="rate">
                <p>RATE OUR WEBSITE</p>
                <form name="rateForm" method="post">
                    <input type="text" id="fullName" placeholder="Full Name">
                    <select id="stars" name="stars">
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                    <textarea id="rate_text" placeholder="Your text here ..." style="height:100px"></textarea>
                    <p id="errorMessage">errorMessage</p>
                    <button type="button" v-on:click="dynamic_row()">Confirm</button>
                </form>

                 <table id="rate">

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
        name: "rate"
    }
</script>

<style scoped>

    .rate {
        display: inline-block;
        width: 100%;
    }
    table {
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

    td, th {
        text-align: left;
        color: #181818;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
    button{
        margin-top: 2px;
        margin-bottom: 2px;
        background-color: #333333;
        font-family: Calibri, monospace;
        font-weight: bold;
        color: #02b3b3;
        border: 1px solid rgb(7, 172, 172);
        border-radius: 4px;
        width: 100%;
        height: 40px;
        cursor: pointer;
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
        .rate {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            background: rgba(0, 0, 0, 0.7);
            width: 90%;
        }
        input[type=text], select, textarea {
            background: rgba(5, 5, 5, 0.5);
            width: 90%;
        }
        button {
            width: 90%;
        }
        table {
            background: rgba(0, 0, 0, 0.7);
            width: 90%;
            margin: 0 auto;

        }
    }

</style>