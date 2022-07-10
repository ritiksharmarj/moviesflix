import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg';

const movie1 = {
    "Title": "Spiderman in Cannes",
    "Year": "2016",
    "imdbID": "tt5978586",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDlmMGQwYmItNTNmOS00OTNkLTkxNTYtNDM3ZWVlMWUyZDIzXkEyXkFqcGdeQXVyMTA5Mzk5Mw@@._V1_SX300.jpg"
}

// omdb api key to fetch the movies
const API_URL = 'http://www.omdbapi.com?apikey=15c14e14';


const App = () => {
    // using useState
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }


    // using useEffect hook to get response from api asap at first load
    useEffect(() => {
        searchMovies('Spiderman');
    }, []);


    return (
        <div className="app">
            <h1>MoviesFlix</h1>


            <div className="search">
                <input placeholder="Search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>


            {movies?.length > 0
                ? (
                    //  movie card 
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}


            <div className="footer">
                <p>Made with ❤ in S.S. Jain Subodh P.G. College</p>
                <p id="developer">Developer - Ritik Sharma | <a href="">Github</a> | <a href="https://www.linkedin.com/in/ritiksharmarj/">LinkedIn</a></p>
            </div>

        </div >
    );
}

export default App;