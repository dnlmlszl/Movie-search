import React, { useEffect, useState } from 'react'
import Movie from './components/Movie'
import Footer from './components/Footer'

import './App.css'


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=44598aebba3bfab2ae6fd15921bff2d6&page=1"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=44598aebba3bfab2ae6fd15921bff2d6&query="


 function App() { 
  const [movies, setMovies] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState('')


    useEffect(() => {
      getMovies(FEATURED_API)
    }, [])

    const getMovies = (API) => {
      fetch(API)
      .then(res => res.json())
      .then(data => {
        console.log(data.results)
        setMovies(data.results)
    })
  }


  const handleOnSubmit = (e) => {
      
    e.preventDefault()

    if(searchTerm) {
      getMovies(SEARCH_API + searchTerm)

      setSearchTerm('')
    }
  }

  const handleOnChange = (e) => {
      setSearchTerm(e.target.value)
  }

  return (
    <>
      <header>
        <form 
        onSubmit={handleOnSubmit}>
            <input 
            className="search" 
            type="text" 
            placeholder="Search Movies" 
            value={searchTerm}
            onChange={handleOnChange}
            />
        </form>
        <img className="header--logo" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" />
      </header>

    <div className="movie--container">
      {movies.length > 0 && movies.map((movie) => 
        <Movie key={movie.id} {...movie} />
      )}      
    </div>
    <Footer />
    </>
  )
}

export default App;
