import { motion } from 'framer-motion';
import { useContext, useRef, useState } from 'react';
import { MoviesContext } from '../context/MoviesContext';
import styles from './styles/ListsSelection.module.css';
import { FaPlus } from 'react-icons/fa';

const ListsSelection = ({setAddToList, movie}) => {
    const {userLists, toggleMovie, isInList, createList} = useContext(MoviesContext);
    const newList = useRef("");
    const [error,setError] = useState(false);
    const handleClick = (e) => {
        if (e.target.classList.contains(styles.ListsSelectionBackdrop)) {
          setAddToList(false);
        }
    }
    const handleSubmit = (e) => {
        setError(false);
        e.preventDefault();
        if(createList(newList.current.value)){
            newList.current.value = "";
        } else {
            setError(true);
        }           
    }
    return (
        <motion.div className={styles.ListsSelectionBackdrop} onClick={handleClick} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0}} >
            <motion.div className={styles.ListsModal} initial={{ y: "-100vh" }} animate={{ y: 0 }}>
                <h1>Agregar a lista:</h1>
                <div className={styles.Lists}>
                    {Object.keys(userLists).map((list) => (
                        <label className={styles.container}>{list == "watchList" ? "Por ver" : list}
                            <input type="checkbox"
                            checked = {isInList(movie.imdbID, list)}
                            onChange={() => toggleMovie(movie, list)}/>
                            <span className={styles.checkmark}></span>
                        </label>
                    ))}
                </div>
                <form action="" onSubmit={handleSubmit} className={styles.addList}>
                    <div className={styles.addListBar}>
                        <button className={styles.addButton} type="submit"><FaPlus className={styles.addButtonIcon}/></button>
                        <input className={styles.addListField} type="text" placeholder="Crea una lista" ref={newList}/>
                    </div>
                    <span style ={error ? {"visibility":"visible"}:null} className={styles.errorMessage}>Ya existe una lista con este nombre</span>
                </form>
            </motion.div>
        </motion.div>
    )
}

export default ListsSelection



