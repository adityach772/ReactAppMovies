import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import './search.svg';
import searchIcon from './search.svg'; 
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=ddf7363d'

const App = () => {

  const[searchTerm,setSearchTerm] =useState();
  const[movies,setMovies] = useState([]);

  const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();    
      console.log(data.Search)
      setMovies(data.Search);
    };

  const handleKeyDown = (event) =>{
    if (event.key === 'Enter') {
        searchMovies(searchTerm);
    }
   }
   useEffect( () => {
    searchMovies("Disney");
   },[]); //only want to call after start 

    return (
        <div className="app">
            <h1>Cinematic Search</h1>
            <div className="search">
               <input
                  placeholder="Search Movies Here" 
                  value = {searchTerm}
                  onChange = {(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
               />
               <img src={searchIcon} alt="search icon" onClick={() => {searchMovies(searchTerm)}}/>
            </div>

            {movies?.length > 0 ?
              (<div className="container">
                {
                    movies.map((movie,index) => (<MovieCard key={movie.imdbID} movie={movie}/>))  
                }
                
            </div>) 
            :( <div className="empty">
               <h2>No movies found</h2>
               </div>
             )}     
        </div>
        
    );
}

export default App;