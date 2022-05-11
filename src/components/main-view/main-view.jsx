import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


// create and render MainView class component from React.Component
export class MainView extends React.Component { 
  
  constructor() {
    super(); // call the constructor of parent class React.Component
    this.state = {
      movies: [
        {_id: 1, title: "Inception", description: "desc1...", imagePath: "..."},
        {_id: 2, title: "The Shawshank Redemption", description: "desc2...", imagePath: "..."},
        {_id: 3, title: "Gladiator", description: "desc3...", imagePath: "..."}
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    // object destruction same as: const movies = this.state.movies;
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
      return (
        <div className="main-view">
          {selectedMovie
            ? <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            : movies.map( movie => (<MovieCard key={movie._id} movieData={movie} onMovieClick={movie => { this.setSelectedMovie(movie); }} /> ))
          }
        </div>
      );
  }
}



