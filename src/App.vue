<script>
import AppSearchbar from './components/AppSearchbar.vue';
import axios from 'axios';
import { store } from './store';


export default {
    components: {
        AppSearchbar
    },
    data() {
        return {
            store,
            filmSearched: ""
        }
    },
    methods: {
        getFilm() {
            axios
                .get(this.store.baseUrl, {
                    params: {
                        api_key: this.store.apiKey,
                        query: this.filmSearched
                    }
                })
                .then((resp) => {
                    this.store.films= resp.data.results;
                    console.log(resp.data);
                }
                )
        }
    }
}

</script>

<template>

    <input type="search" v-model="filmSearched">
    <AppSearchbar @search="getFilm" />

    <ul v-for="film in store.films">
        <li>Titolo: {{ film.title }}</li>
        <li>Titolo Originale: {{ film.original_title }}</li>
        <li>Lingua: {{ film.original_language }}</li>
        <li>Voto: {{ film.vote_average }}</li>
    </ul>
</template>

<style></style>
