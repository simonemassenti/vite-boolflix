<script>
import AppSearchbar from './components/AppSearchbar.vue';
import axios from 'axios';
import { store } from './store';
import AppCard from './components/AppCard.vue';


export default {
    components: {
    AppSearchbar,
    AppCard
},
    data() {
        return {
            store,
            movieSearched: ""

        }
    },
    methods: {
        getMovie() {
            const params = {
                        api_key: this.store.apiKey,
                        query: this.movieSearched
                    }
            axios
                .get(this.store.baseUrl+`movie`, {params})
                .then((resp) => {this.store.movies = resp.data.results;});
            axios
                .get(this.store.baseUrl+`tv`, {params})
                .then((resp) => {this.store.series = resp.data.results;});
        }
    }
}

</script>

<template>
    <input type="search" v-model="movieSearched">
    <AppSearchbar @search="getMovie" />
    <h1>Film</h1>
    <AppCard v-for="movie in store.movies" type="movie" :movie="movie"/>

    <h1>Serie TV</h1>
    <AppCard v-for="serie in store.series" type="serie" :movie="serie"/>
</template>

<style>
@import "@fortawesome/fontawesome-free/css/all.css";
</style>
