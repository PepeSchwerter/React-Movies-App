import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useState } from "react";
import { fetchMovies } from './api/';
import Search from "./components/Search";
import MoviesGrid from "./components/MoviesGrid";
import { MoviesProvider } from "./context/MoviesContext"

function App() {
  const [searchedMovies, setSearchedMovies] = useState({});

  const handleSearch = async (search) => {
    let movies = await fetchMovies(search);
    // if (movies.length > 100) {
    //   movies = movies.slice(0,100)
    // }
    setSearchedMovies(movies);
  }

  return (
    <MoviesProvider>
      <div className="App">
        <Sidebar/>
        <div className="main">
          <Search handleSearch={handleSearch}/>
          <MoviesGrid movies={searchedMovies.Search ? searchedMovies.Search : []}/>
        </div>
      </div>
    </MoviesProvider>
  );
}

export default App;
