import styles from "./styles/MovieCard.module.css"
import { motion } from 'framer-motion';

const MovieCard = ({ title, year, poster, imdbID , handleSelectedMovie }) => {
    return (
        <motion.div className={styles.movieCard}  onClick={() => handleSelectedMovie(imdbID)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img src={poster !== 'N/A'? poster : "https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-romantic-blue-film-phase-movie-poster-background-image_136505.jpg"} alt="" className={styles.movieCardPoster} />
            <span className={styles.movieCardTitle}>{title}</span>
            <span className={styles.movieCardYear}>{year}</span>
        </motion.div>
    )
}

export default MovieCard
