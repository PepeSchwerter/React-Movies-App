import MovieList from "./MovieList"
import { useContext } from "react"
import { MoviesContext } from "../context/MoviesContext"

const MovieLists = () => {
    let { userLists, ratedList } = useContext(MoviesContext);
    if(ratedList) ratedList.sort((mov1,mov2) => (mov1.Rating > mov2.Rating) ? -1 : ((mov2.Rating > mov1.Rating) ? 1 : 0)); 
    return (
        <div>
            <h1>Mis Listas</h1>
                <>
                    <MovieList list={{name:"Películas reseñadas", movies: ratedList}}/>
                    {Object.keys(userLists).map((list) => {
                        if(list != "watchList") return <MovieList list={{name: list, movies: userLists[list]}}/>
                    })}
                </>           
        </div>
    )
}

export default MovieLists
