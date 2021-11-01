import React, { createContext, useState, useEffect } from 'react'

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem("watchList")));
    const [ratedList, setRatedList] = useState(JSON.parse(localStorage.getItem("ratedList")));
    const toggleMovie = (movie) => {
        if(!isInWatchList(movie.imdbID)){
            if (watchList == null){
                setWatchList([movie]);   
            } else {
                setWatchList([...watchList, movie]);
            }
        }
        else {
            const filtered = watchList.filter((m) => m.imdbID !== movie.imdbID);
            setWatchList(filtered);
        }
    }
    const isInWatchList = (imdbID) => {
        if (watchList !== null) {
            for (let i = 0; i < watchList.length; i++) {
                if(watchList[i].imdbID === imdbID){
                    return true;
                }   
            }
        }
        return false;
    }
    
    useEffect(() => {
        localStorage.setItem("watchList", JSON.stringify(watchList))
    }, [watchList])

    const toggleRatedMovie = (movie) => {
        let filtered = [];
        if (ratedList !== null) {filtered = ratedList.filter((m) => m.imdbID !== movie.imdbID)};
        setRatedList(filtered);
        if(movie.Rating > 0){
            if(ratedList !== null || ratedList !== []) {
                setRatedList([...filtered,movie]);
            } else {
                setRatedList([movie]);
            }
        }
    }

    const getMovieRating = (imdbID) => {
        if (ratedList){
            for(const movie of ratedList) {
                if(movie.imdbID === imdbID) {
                    return movie.Rating;
                }
            }
        }
        return null;
    }
    
    useEffect(() => {
        localStorage.setItem("ratedList", JSON.stringify(ratedList))
    }, [ratedList])

    return (
        <MoviesContext.Provider value={{watchList, toggleMovie, isInWatchList, toggleRatedMovie, getMovieRating, ratedList}}>
            { children }
        </MoviesContext.Provider>
    )
}
