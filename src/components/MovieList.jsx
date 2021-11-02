import styles from "./styles/MovieList.module.css"
import {IoIosArrowDown, IoIosArrowUp, IoIosTrash} from "react-icons/io"
import { IoMdClose } from "react-icons/io";
import { useState, useContext } from "react";
import MovieRatings from "./MovieRatings";
import MovieModal from "./MovieModal"
import { MoviesContext } from '../context/MoviesContext';
import { motion } from 'framer-motion';
import { fetchMovie } from '../api';

const MovieList = ({ list }) => {
    const {toggleRatedMovie, toggleMovie, deleteList} = useContext(MoviesContext);
    const handleDeleteRating = (e, movie, list) => {
        e.stopPropagation();
        const imdbID = movie.imdbID;
        if(list == "Películas reseñadas"){
            toggleRatedMovie({imdbID, Rating: 0});
        } 
        else {
            toggleMovie(movie, list);}
    }
    const [selectedMovie, setSelectedMovie] = useState(null)
    const handleSelectedMovie = async (imdbID) => {
        const fetchedMovie = await fetchMovie(imdbID)
        setSelectedMovie(fetchedMovie)
    }
    const [open, setOpen] = useState(false);
    let posters = [];
    if (list.movies){
        for (const movie of list.movies) {
            posters.push(movie.Poster);
            if (posters.length > 4 ) break;
        }
    }
    return (
        <>
            <div style={open ? {"background-color": "rgba(255, 255, 255, 0.296)"} : null} className={styles.movieList}
            onClick={() => setOpen(!open)}>
                <div className={styles.movieListIcon}>
                    <div className={styles.movieListPosters}>
                        {posters.map((poster) => (
                            <img src={poster} alt=""/>
                        ))}
                    </div>
                    <h2>{list.name}</h2>
                </div>
                <div className={styles.movieListDetails}>
                    <span>{list.movies && list.movies.length + " películas"}</span>
                    {open ? 
                    <IoIosArrowUp className={styles.movieListDropIcon} onClick={() => setOpen(!open)}/> : 
                    <IoIosArrowDown className={styles.movieListDropIcon} onClick={() => setOpen(!open)}/>
                    }
                    <IoMdClose style={list.name == "Películas reseñadas" ? {"visibility":"hidden"}:null}
                    className={styles.movieListDeleteIcon} onClick={() => deleteList(list.name)}/>
                </div>
            </div>
            {(open && list.movies)  && <motion.ul layout className={styles.movieListDisplay} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {list.movies.map((movie) => (
                    <li className={styles.movieListItem} onClick={() => handleSelectedMovie(movie.imdbID)}>
                        <div className={styles.movieListIcon}>
                            <img src={movie.Poster} className={styles.movieListPoster} />
                            <strong style={{"fontSize": "2.5rem"}}>{movie.Title}</strong>
                        </div>
                        <div className={styles.movieListDetails}>
                            {movie.Rating && <MovieRatings movieRatings={[{Value: movie.Rating}]}/>}
                            <IoIosTrash className={styles.movieListDropIcon} onClick={(e) => handleDeleteRating(e,movie,list.name)}/>
                        </div>
                    </li>
                ))}
            </motion.ul>}
            {selectedMovie && <MovieModal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>}
        </>
    )
}

export default MovieList
