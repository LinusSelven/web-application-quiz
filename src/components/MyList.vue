<template>
    <div class="list">
        <h2>Quiz json</h2>
      <!--  <img alt="Vue logo" src="../assets/logo.png"> -->
        <ul>
            <li v-for="post in posts" v-bind:key="post.id">
               <h2> {{ post.quaison }}</h2>
                <h3>{{ post.choice1 }} {{ post.choice2 }}{{ post.choice3 }}</h3>
                {{ post.answer }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "MyList",
        data: function(){
            return {
                posts: [
                    { id: 1, quaison: 'De flesta människor i Europa bor i ___. ', choice1:'Byar   ', choice2: 'Landsbygden   ', choice3: ' Städer', answer: 'Städer '  },
                    { id: 2, quaison: 'Hur många republiker finns det i Europa?', choice1: '35 ', choice2: '28 ', choice3: '32 ', answer: '32 ' },
                    { id: 3, quaison: 'Vad betyder republik? ', choice1: 'Att man har en kung ', choice2: 'Att man har valt etn president ', choice3: ' ', answer: 'Att man har valt etn president ' },
                    { id: 4, quaison: 'Vilket hav visas på kartan', choice1: 'a ', choice2: 'b ', choice3: 'c ', answer: 'b ' },
                    ]
            }
        }
    }
</script>

<style scoped>
    .list{
        background-color: darkseagreen;
    }
    h2{
        font-family: Georgia, Helvetica, Arial, san-serif;
    }
</style>