<script>

import axios from 'axios';
import { store } from '../store';
export default {
    props: {
        movie: Object,
        type: String
    },
    data() {
        return {
            flags: ["en", "it", "es"],
            store,
            cast: [],
            genrs: [],
            infoButton: true
        }
    },
    methods: {
        flag() {
            return new URL(`../assets/img/${this.movie.original_language}.png`, import.meta.url).href;
        },
        getImage() {
            return `https://image.tmdb.org/t/p/w342/${this.movie.poster_path}`;
        },
        getInfo() {
            const params={
                api_key: this.store.apiKey
            }
            this.infoButton= false;
            axios
            .get(`https://api.themoviedb.org/3/movie/${this.movie.id}/credits`, {params})
            .then((resp)=>{this.cast = resp.data.cast;});     
            
            axios
            .get(`https://api.themoviedb.org/3/genre/movie/list`, {params})
            .then((resp)=>{
                resp.data.genres.forEach(element => {
                    for(let i=0; i< this.movie.genre_ids.length; i++){
                        if(this.movie.genre_ids[i] == element.id){
                            this.genrs.push(element.name)
                        }
                    }
                })});  
        }
    }
}
</script>

<template>
    <ul class="card">
        <li class="info" v-if="type == 'movie'">
            <span class="title">Titolo:</span> {{ movie.title }}
        </li>
        <li class="info" v-else>
            <span class="title">Titolo:</span> {{ movie.name }}
        </li>

        <li class="info" v-if="type == 'movie'">
           <span class="title"> Titolo Originale:</span> {{ movie.original_title }}
        </li>
        <li class="info" v-else>
            <span class="title">Titolo Originale:</span> {{ movie.original_name }}
        </li>

        <li class="info" v-if="flags.includes(movie.original_language)">
            <img class="flag" :src="flag()" alt="">
        </li>
        <li class="info" v-else>
            <span class="title">Lingua:</span> {{ movie.original_language }}
        </li>

        <li class="info">
            <span v-for="star in 5">
                <i v-if="star <= Math.round(movie.vote_average/2)" class="fa-solid fa-star"></i>
                <i v-else class="fa-regular fa-star"></i>
            </span>
        </li>

        <li class="info">
            <span class="title">Overview:</span> {{ movie.overview }}
        </li>

        <li class="info">
            <button v-if="infoButton" @click="getInfo">Più info</button>
            <ul v-else>
                <li class="info title">Cast:</li>
                <li v-for="(person, i) in cast" class="info"> 
                    <span v-if="i < 5"> {{ person.name }} </span>
                </li>
                <li class="info" v-if="cast.length==0">Cast non disponibile</li>

                <li class="info title">Genere:</li>
                <li class="info">
                    <span v-for="(genr, i) in genrs"> 
                        <span v-if="i < genrs.length - 1">{{ genr+", " }}</span>
                        <span v-else>{{ genr }}</span>
                    </span>
                    <li class="info" v-if="genrs.length==0">Genere non disponibile</li>
                </li>
            </ul>
        </li>

        <li>
            <img class="copertina" v-if="movie.poster_path" :src="getImage()" alt="">
            <img class="copertina none" v-else src="../assets/img/copertina-non-disponibile.jpg" alt="">
        </li>
    </ul>
</template>

<style scoped>
</style>