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
        },
        getImage() {
            return `https://image.tmdb.org/t/p/w342/${this.movie.poster_path}`;
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

        <li>Voto: {{ Math.round(movie.vote_average/2)  }}</li>

        <li>
            <span v-for="star in 5">
                <i v-if="star <= Math.round(movie.vote_average/2)" class="fa-solid fa-star"></i>
                <i v-else class="fa-regular fa-star"></i>
            </span>
        </li>

        <li>
            <img v-if="movie.poster_path" :src="getImage()" alt="">
            <img v-else src="../assets/img/copertina-non-disponibile.jpg" alt="">
        </li>
    </ul>
</template>

<style scoped>
    img {
        width: 50px;
    }
</style>