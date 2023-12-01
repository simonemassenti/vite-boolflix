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
            movieSearched: "",
            loading: false,
            isVoidSerie: false,
            isVoidFilm: false,
            genrs: [],
            filterGenr: null
        }
    },
    methods: {
        getMovie() {
            const params = {
                api_key: this.store.apiKey,
                query: this.movieSearched
            }
            this.loading = true;
            this.isVoidSerie = false;
            this.isVoidFilm = false;
            axios
                .get(this.store.baseUrl + `movie`, { params })
                .then((resp) => {
                    this.store.movies = resp.data.results;
                    this.store.movies.length == 0 ? this.isVoidFilm = true : this.isVoidFilm;

                });
            axios
                .get(this.store.baseUrl + `tv`, { params })
                .then((resp) => {
                    this.store.series = resp.data.results;
                    this.store.series.length == 0 ? this.isVoidSerie = true : this.isVoidSerie;

                    this.loading = false;
                });
        }
    }
}

</script>

<template>
    <div class="wrap">
        <header>
            <div class="header-container">
                <div>
                    <h1>BOOLFLIX</h1>
                </div>

                <div>
                    

                    <input type="search" v-model="movieSearched">
                    <AppSearchbar @search="getMovie" />
                </div>

            </div>

        </header>


        <div class="main-container">
            <h1>Film</h1>
            <div class="cards-container">
                <h3 v-if="loading">Loading...</h3>
                <h3 v-if="isVoidFilm">La ricerca non ha prodotto risultati sui Film</h3>
                <AppCard v-for="movie in store.movies" type="movie" :movie="movie" />
            </div>

            <h1>Serie TV</h1>
            <div class="cards-container">
                <h3 v-if="loading">Loading...</h3>
                <h3 v-if="isVoidSerie">La ricerca non ha prodotto risultati sulle Serie TV</h3>
                <AppCard v-for="serie in store.series" type="serie" :movie="serie" />

            </div>
        </div>

    </div>
</template>

<style>
@import "@fortawesome/fontawesome-free/css/all.css";
</style>
