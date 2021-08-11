import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import MovieLists from "./components/MovieLists";
import { useState } from "react";
import { fetchMovies } from './api/';
import Search from "./components/Search";
import MoviesGrid from "./components/MoviesGrid";
import { MoviesProvider } from "./context/MoviesContext"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

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
      <Router>
        <Sidebar/>
          <div className="main">
            <Switch>
              <Route exact path="/">
                <div className="searchWrap">
                  <h1>Descubre</h1>
                  <Search handleSearch={handleSearch}/>
                </div>
                <MoviesGrid movies={searchedMovies.Search ? searchedMovies.Search : []}/>
              </Route>
              <Route path="/watchlist">
                <Main/>
              </Route>
              <Route path="/lists">
                <MovieLists/>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </MoviesProvider>
  );
}

export default App;
