import styles from './styles/Main.module.css'
import MoviesGrid from './MoviesGrid'

const Main = ({  }) => {
    return (
        <div className={styles.main}>
            <h1>Por ver</h1>
            <MoviesGrid/>
        </div>
    )
}

export default Main
