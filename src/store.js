import { reactive } from "vue";

export const store = reactive ({
    films: [],
    baseUrl: "https://api.themoviedb.org/3/search/movie",
    apiKey: "85b07e7ce393518af8f972fef6a9447b"
})