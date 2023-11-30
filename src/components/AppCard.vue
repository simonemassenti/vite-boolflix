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
    <ul class="card">
        <li class="info" v-if="type == 'movie'">
            <span class="bold">Titolo:</span> {{ movie.title }}
        </li>
        <li class="info" v-else>
            <span class="bold">Titolo:</span> {{ movie.name }}
        </li>

        <li class="info" v-if="type == 'movie'">
           <span class="bold"> Titolo Originale:</span> {{ movie.original_title }}
        </li>
        <li class="info" v-else>
            <span class="bold">Titolo Originale:</span> {{ movie.original_name }}
        </li>

        <li class="info" v-if="flags.includes(movie.original_language)">
            <img class="flag" :src="flag()" alt="">
        </li>
        <li class="info" v-else>
            <span class="bold">Lingua:</span> {{ movie.original_language }}
        </li>

        <li class="info">
            <span v-for="star in 5">
                <i v-if="star <= Math.round(movie.vote_average/2)" class="fa-solid fa-star"></i>
                <i v-else class="fa-regular fa-star"></i>
            </span>
        </li>

        <li class="info">
            <span class="bold">Overview:</span> {{ movie.overview }}
        </li>

        <li>
            <img class="copertina" v-if="movie.poster_path" :src="getImage()" alt="">
            <img class="copertina" v-else src="../assets/img/copertina-non-disponibile.jpg" alt="">
        </li>
    </ul>
</template>

<style scoped>
</style>