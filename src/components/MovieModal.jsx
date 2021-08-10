import styles from './styles/MovieModal.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { BiShow } from 'react-icons/bi';
import MovieRatings from './MovieRatings';
import StarsRating from './StarsRating';
import { MoviesContext } from '../context/MoviesContext';

const MovieModal = ({ selectedMovie, setSelectedMovie }) => {
    const {toggleMovie, isInWatchList} = useContext(MoviesContext);
    const movie = {imdbID:selectedMovie.imdbID, Title:selectedMovie.Title, Poster: selectedMovie.Poster, Year:selectedMovie.Year};
    const handleClick = (e) => {
        if (e.target.classList.contains(styles.movieModalBackdrop)) {
          setSelectedMovie(null);
        }
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
                            <div className="tooltipItem" onClick={() => toggleMovie(movie)} 
                            style={isInWatchList(selectedMovie.imdbID) ? {"color":"rgb(51, 153, 197)"} : null}>
                                <BiShow className={styles.movieModalHeaderIcon}/>
                            </div>  
                            <span className="tooltiptext">{isInWatchList(selectedMovie.imdbID) ? "Quitar de Por ver" : "Agregar a Por ver"}</span>
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
                    <StarsRating/>
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
        </motion.div>
    )
}

export default MovieModal
