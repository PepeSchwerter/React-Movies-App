import styles from "./styles/MovieList.module.css"
import {IoIosArrowDown, IoIosArrowUp, IoIosTrash} from "react-icons/io"
import { useState, useContext } from "react";
import MovieRatings from "./MovieRatings";
import MovieModal from "./MovieModal"
import { MoviesContext } from '../context/MoviesContext';
import { motion } from 'framer-motion';
import { fetchMovie } from '../api';

const MovieList = ({ list }) => {
    const {toggleRatedMovie} = useContext(MoviesContext);
    const handleDeleteRating = (e, imdbID) => {
        e.stopPropagation();
        toggleRatedMovie({imdbID, Rating: 0})
    }
    const [selectedMovie, setSelectedMovie] = useState(null)
    const handleSelectedMovie = async (imdbID) => {
        const fetchedMovie = await fetchMovie(imdbID)
        setSelectedMovie(fetchedMovie)
    }
    const [open, setOpen] = useState(false);
    let posters = [];
    for (const movie of list.movies) {
        posters.push(movie.Poster);
        if (posters.length > 4 ) break;
    }
    return (
        <>
            <div className={styles.movieList}>
                <div className={styles.movieListIcon}>
                    <div className={styles.movieListPosters}>
                        {posters.map((poster) => (
                            <img src={poster} alt=""/>
                        ))}
                    </div>
                    <h2>{list.name}</h2>
                </div>
                <div className={styles.movieListDetails}>
                    <span>{list.movies.length + " películas"}</span>
                    {open ? 
                    <IoIosArrowUp className={styles.movieListDropIcon} onClick={() => setOpen(!open)}/> : 
                    <IoIosArrowDown className={styles.movieListDropIcon} onClick={() => setOpen(!open)}/>
                    }
                </div>
            </div>
            {open && <motion.ul layout className={styles.movieListDisplay} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {list.movies.map((movie) => (
                    <li className={styles.movieListItem} onClick={() => handleSelectedMovie(movie.imdbID)}>
                        <div className={styles.movieListIcon}>
                            <img src={movie.Poster} className={styles.movieListPoster} />
                            <strong style={{"fontSize": "2.5rem"}}>{movie.Title}</strong>
                        </div>
                        <div className={styles.movieListDetails}>
                            <MovieRatings movieRatings={[{Value: movie.Rating}]}/>
                            <IoIosTrash className={styles.movieListDropIcon} onClick={(e) => handleDeleteRating(e,movie.imdbID)}/>
                        </div>
                    </li>
                ))}
            </motion.ul>}
            {selectedMovie && <MovieModal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>}
        </>
    )
}

export default MovieList
