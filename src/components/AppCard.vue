<script>

export default {
    props: {
        movie: Object,
        type: String
    },
    data() {
        return {
            flags: ["en", "it", "es"]
        }
    },
    methods: {
        flag() {
            return new URL(`../assets/img/${this.movie.original_language}.png`, import.meta.url).href;
        }
    }
}

</script>

<template>
    <ul>
        <li v-if="type == 'movie'">Titolo: {{ movie.title }}</li>
        <li v-else>Titolo: {{ movie.name }}</li>

        <li v-if="type == 'movie'">Titolo Originale: {{ movie.original_title }}</li>
        <li v-else>Titolo Originale: {{ movie.original_name }}</li>

        <li v-if="flags.includes(movie.original_language)">
           Lingua: <img :src="flag()" alt="">
        </li>
        <li v-else>Lingua: {{ movie.original_language }}</li>
        
        <li>Voto: {{ movie.vote_average }}</li>
    </ul>
</template>

<style scoped>
    img {
        width: 50px;
    }
</style>