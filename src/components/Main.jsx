import styles from './styles/Main.module.css'

const Main = ({ movies }) => {
    return (
        <div className={styles.main}>
            {movies.Search && <h1>{movies.Search[0].Title}</h1>}
        </div>
    )
}

export default Main
