import React, { createContext, useState, useEffect } from 'react'

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem("watchList")))
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
                console.log(watchList[i].imdbID)
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

    return (
        <MoviesContext.Provider value={{watchList, toggleMovie, isInWatchList}}>
            { children }
        </MoviesContext.Provider>
    )
}
