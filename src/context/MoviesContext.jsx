import React, { createContext, useState, useEffect } from 'react'

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    // const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem("watchList")));
    const parseUserLists = () => {
        const list = JSON.parse(localStorage.getItem("userLists"));
        if (list == null) return {watchList : [], xd : []};
        return list;
    }
    const [ratedList, setRatedList] = useState(JSON.parse(localStorage.getItem("ratedList")));
    const [userLists, setUserLists] = useState(parseUserLists);
    
    const toggleMovie = (movie, wantedList) => {
        if(!isInList(movie.imdbID, wantedList)){
            let list = [...userLists[wantedList]];
            list.push(movie);
            userLists[wantedList] = list;
            setUserLists({...userLists});
        }
        else {
            userLists[wantedList] = userLists[wantedList].filter((m) => m.imdbID !== movie.imdbID);
            setUserLists({...userLists});
        }
    }
    const isInList = (imdbID, list) => {
        for (let i = 0; i < userLists[list].length; i++) {
            if(userLists[list][i].imdbID === imdbID){
                return true;
            }   
        }
        return false;
    }

    const createList = (name) => {
        if (userLists.hasOwnProperty(name)) return false;
        userLists[name] = [];
        setUserLists({...userLists});
        return true;
    }

    const deleteList = (name) => {
        delete userLists[name];
        setUserLists({...userLists});
    }
    
    useEffect(() => {
        localStorage.setItem("userLists", JSON.stringify(userLists))
    }, [userLists])

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
        <MoviesContext.Provider value={{userLists, toggleMovie, isInList, toggleRatedMovie, getMovieRating, ratedList, createList, deleteList}}>
            { children }
        </MoviesContext.Provider>
    )
}
