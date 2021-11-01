import styles from './styles/MovieModal.module.css';
import {useState} from "react";
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { BiShow } from 'react-icons/bi';
import {BiListPlus} from 'react-icons/bi';
import MovieRatings from './MovieRatings';
import ListsSelection from './ListsSelection';
import StarsRating from './StarsRating';
import { MoviesContext } from '../context/MoviesContext';

const MovieModal = ({ selectedMovie, setSelectedMovie }) => {
    const [addToList, setAddToList] = useState(false);

    const {toggleMovie, isInList, toggleRatedMovie, getMovieRating} = useContext(MoviesContext);
    const movie = {imdbID:selectedMovie.imdbID, Title:selectedMovie.Title, Poster: selectedMovie.Poster, Year:selectedMovie.Year};
    const rating = getMovieRating(movie.imdbID);
    const handleClick = (e) => {
        if (e.target.classList.contains(styles.movieModalBackdrop)) {
          setSelectedMovie(null);
        }
    }
    const setRatedMovie = (rating) => {
        toggleRatedMovie({...movie, Rating: rating});
    }
    return (
        <motion.div className={styles.movieModalBackdrop} onClick={handleClick} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0}} >
            <motion.div className={styles.movieModal} initial={{ y: "-100vh" }} animate={{ y: 0 }}>
                <img src={`https://img.omdbapi.com/?apikey=54a757e3&i=${selectedMovie.imdbID}&h=1000`} alt="" className={styles.movieModalPoster}/>
                <div className={styles.movieModalInfo}>
                    <div className={styles.movieModalHeader}>
                        <h1>{selectedMovie.Title}</h1>
                        <div className="tooltip">
                            <div className="tooltipItem" onClick={() => toggleMovie(movie, "watchList")} 
                            style={isInList(selectedMovie.imdbID, "watchList") ? {"color":"rgb(51, 153, 197)"} : null}>
                                <BiShow className={styles.movieModalHeaderIcon}/>
                            </div>  
                            <span className="tooltiptext">{isInList(selectedMovie.imdbID, "watchList") ? "Quitar de Por ver" : "Agregar a Por ver"}</span>
                        </div>
                        <div className="tooltip">
                            <div className="tooltipItem" onClick={() => setAddToList(true)}>
                                <BiListPlus className={styles.movieModalHeaderIcon}/>
                            </div>  
                            <span className="tooltiptext">Agregar a Lista</span>
                        </div>
                    </div>
                    <span className={styles.movieModalDetails}>
                        {[selectedMovie.Year, selectedMovie.Runtime, selectedMovie.Language, selectedMovie.Rated].join(' / ')}
                    </span>
                    <div className={styles.movieModalGenres}>
                        {selectedMovie.Genre.split(', ').map((genre) => (
                            <span className={styles.movieModalGenre} >{genre}</span>
                        ))}
                    </div>

                    <StarsRating setRatedMovie={setRatedMovie} userRating={rating}/>

                    <div className={styles.movieModalPlot}>
                        <p>
                            {selectedMovie.Plot}
                        </p>
                    </div>
                    <div className={styles.movieModalPeople}>
                            <span><strong>Director: </strong>{selectedMovie.Director}</span>
                            <span><strong>Writer: </strong>{selectedMovie.Writer}</span>
                            <span><strong>Actors: </strong>{selectedMovie.Actors}</span>
                    </div>
                    <MovieRatings movieRatings={selectedMovie.Ratings}/>
                </div>
            </motion.div>
            {addToList && <ListsSelection setAddToList={setAddToList} movie={selectedMovie}/>}
        </motion.div>
    )
}

export default MovieModal
