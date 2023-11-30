import { reactive } from "vue";

export const store = reactive ({
    movies: [],
    series: [],
    baseUrl: "https://api.themoviedb.org/3/search/",
    apiKey: "85b07e7ce393518af8f972fef6a9447b"
})