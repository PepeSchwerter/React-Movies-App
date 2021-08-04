import { useRef } from "react"
import styles from "./styles/Search.module.css"
import { FaSearch } from "react-icons/fa"

const Search = ({ handleSearch }) => {
    const movie = useRef("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleSearch(movie.current.value);
    }

    return (
        <div className={styles.search}>
            <form action="" onSubmit={handleSubmit} className={styles.searchForm}>
                <button className={styles.searchButton}type="submit"><FaSearch className={styles.searchButtonIcon}/></button>
                <input className={styles.searchBar} type="text" placeholder="Busque por una película" ref={movie}/>
            </form>
        </div>
    )
}

export default Search
