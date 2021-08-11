import styles from "./styles/MovieModal.module.css"
import { motion } from "framer-motion";

const MovieRatings = ({ movieRatings }) => {
    const ratings = movieRatings.map((rating) => {
        if (rating.Source === "Rotten Tomatoes"){
            const value = rating.Value.substring(0, rating.Value.length - 1);
            return {source: rating.Source, value: value}
        }
        if (rating.Source === "Internet Movie Database"){
            const value = parseFloat(rating.Value.split('/')[0]);
            return {source: "IMDB", value: value*10} 
        }
        if (rating.Source === "Metacritic"){
            const value = parseInt(rating.Value.split('/')[0]);
            return {source: rating.Source, value: value} 
        }
        return {source: "Mi valoración", value:rating.Value * 10}
    })
    return (
        <div className={styles.movieModalRatings}>
            {ratings.map((rating) => (
                <motion.div className={styles.movieModalRating}
                initial={{scale : 0}}
                animate={{scale :1}}
                transition={{ delay: 0.5 }}
                >
                    <div 
                    className={"radialProgressBar " + (rating.value > 50 ? "progress51" : "progress49")} 
                    style={{"--val": rating.value}}>
                        <div class="overlay">{rating.value}</div>
                    </div>
                    <span>{rating.source}</span>
                </motion.div>
            ))}
        </div>
    )
}

export default MovieRatings
