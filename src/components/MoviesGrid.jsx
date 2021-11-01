import styles from "./styles/MoviesGrid.module.css"
import { useState, useEffect, useContext } from "react"
import { motion } from 'framer-motion';
import { fetchMovie } from '../api';
import MovieCard from "./MovieCard"
import MovieModal from "./MovieModal"
import { MoviesContext } from '../context/MoviesContext';

const MoviesGrid = ({ movies }) => {
    let watchFlag = false;
    const {userLists} = useContext(MoviesContext);
    if(movies === undefined) {
        if(userLists != null) movies = userLists.watchList;
        watchFlag = true;
    }
    const [selectedMovie, setSelectedMovie] = useState(null)
    const handleSelectedMovie = async (imdbID) => {
        const fetchedMovie = await fetchMovie(imdbID)
        setSelectedMovie(fetchedMovie)
    }
    return (
        <div className={styles.moviesGrid}>
            {movies && movies.map((movie) => (
                <motion.div layout>
                    <MovieCard key={movie.imdbID} title={movie.Title} year={movie.Year} poster={movie.Poster} handleSelectedMovie={handleSelectedMovie} imdbID={movie.imdbID} watchlist={watchFlag}/>
                </motion.div>
            ))}
            {selectedMovie && <MovieModal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>}
        </div>
    )
}

export default MoviesGrid
