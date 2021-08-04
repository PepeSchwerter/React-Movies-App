import axios from "axios";

const apiKey = "54a757e3";
const url = `https://www.omdbapi.com/?apikey=${apiKey}&`;
const posterUrl = `https://www.img.omdbapi.com/?apikey=${apiKey}&`;

export const fetchMovies = async (search) => {
    if (search == '') {
        return {};
    }
    try {
        const searchUrl = url+'s='+search;
        const movies = await axios.get(searchUrl);
        return movies.data
    } catch (error) {
        return error;
    }
}

export const fetchMovie = async (imdbID) => {
    try {
        const searchUrl = url+'i='+imdbID
        const movie = await axios.get(searchUrl)
        return movie.data
    } catch(error) {
        return error
    }   
}