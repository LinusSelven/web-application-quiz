<template>
    <div class="book">
        <h2>Mina böcker</h2>
        <ul>
            <li v-for="quiz in quiz" v-bind:key="quiz.quizId">{{ qiuz.qiuzQuestion }} }</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Myqiuzz",
        data: function(){
            return {
                qiuzz: []
            }
        },
        mounted(){
            fetch('http://127.0.0.1:3000/api/qiuz/')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.qiuz);
                    this.qiuzz = data.qiuz;
                });
        }

    }
</script>

<style scoped>
    .book{
        background-color: burlywood;
    }
    h2{
        font-family: Georgia, Helvetica, Arial, san-serif;
    }
</style>