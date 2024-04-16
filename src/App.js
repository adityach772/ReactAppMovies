import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import './search.svg';
import searchIcon from './search.svg'; 
import MovieCard from "./MovieCard";
import { appInsights } from './appinsight.js'; 
import SignInForm from "./signInForm.jsx";
import ManageFavorites from "./manageFavorites.js";
import FavoritesButton  from "./favoritesButton.jsx";

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=ddf7363d'

const App = () => {

  const[searchTerm,setSearchTerm] =useState();
  const[movies,setMovies] = useState([]);
  const [showSignInForm, setShowSignIn] = useState(false); //toggle signinform 
  const [showFavoritesButton,setFavoritesButton] = useState(false);
  const [showSignButton,setSignInButton] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  


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
    searchMovies("Mission");
    appInsights.trackPageView({ name: 'App' });
   },[]); //only want to call after start 

   const handleSignInClick = () => {
    setShowSignIn(true); // Show the sign-in form when the "Sign In" button is clicked
  }

  //getting success status from signin form
  const handleLoginStatus = (status) => {
     console.log("Login Status",status);
     setFavoritesButton(true);
      setSignInButton(false);
  };

  const handleFavoritesClick = () => {
    setShowFavorites(true); 
  };



     if(!showFavorites)
    {
    return (
      
        <div className="app">

            {/* Sign-in button */}
            {
               showSignButton &&  <button className="signin-button" onClick={handleSignInClick}>Sign In</button>
            }
            


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

           
            {/* Conditionally render the sign-in form */}
             {showSignInForm &&  
               <SignInForm  onClose={() => setShowSignIn(false)  } handleLoginStatus={handleLoginStatus} />
             }

             
             {
                showFavoritesButton && <button  className="favorites-button" FavoritesButton onClick={handleFavoritesClick}> Favorites </button>   
             }
                       

       

  
        </div>
        
        );
       }
        else{
                 return <ManageFavorites/>
            }
}

export default App;