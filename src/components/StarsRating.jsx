import { useState } from "react"
import {FaStar} from "react-icons/fa"
import styles from './styles/StarsRating.module.css';

const StarsRating = () => {
    const [rating, setRating] = useState(null);
    const [hoverRating, setHoverRating] = useState(null);
    return (
        <div className={styles.StarsRating}>
            {[...Array(10)].map((_,i)=> {
            const starValue = i + 1;
            return (
                <label 
                    onMouseEnter={()=>setHoverRating(starValue)}
                    onMouseLeave={()=>setHoverRating(null)}>
                    <FaStar 
                        color={starValue <= (hoverRating || rating) && "#3399c5"}
                        className={starValue <= hoverRating && styles.starHover}
                        />
                    
                    <input value={starValue} type="radio" 
                        onClick={()=>setRating(starValue)}
                    />
                </label>
            )})}
        </div>
    )
}

export default StarsRating
