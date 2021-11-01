import styles from "./styles/MovieCard.module.css"
import { motion } from 'framer-motion';
import { BiShow } from 'react-icons/bi';
import { MoviesContext } from "../context/MoviesContext";
import { useContext } from "react";

const MovieCard = ({ title, year, poster, imdbID , handleSelectedMovie, watchlist}) => {
    const {toggleMovie} = useContext(MoviesContext);
    const handleTooltipClick = (e) => {
        e.stopPropagation();
        toggleMovie({imdbID}, "watchList")
    }
    return (
        <motion.div className={styles.movieCard}  onClick={() => handleSelectedMovie(imdbID)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img src={poster !== 'N/A'? poster : "https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-romantic-blue-film-phase-movie-poster-background-image_136505.jpg"} alt="" className={styles.movieCardPoster} />
            <span className={styles.movieCardTitle}>{title}</span>
            <div className={styles.movieCardBottom}>
                {year}
                {watchlist && 
                <div className="tooltip" style={{"fontSize":"3rem"}}>
                    <div className="tooltipItem" onClick={handleTooltipClick} 
                    style={{"color":"rgb(51, 153, 197)"}}>
                        <BiShow/>
                    </div>  
                    <span className="tooltiptext">Quitar de Por ver</span>
                </div>}
            </div>
        </motion.div>
    )
}

export default MovieCard
