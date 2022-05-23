import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

// create and render MainView class component from React.Component
export class MainView extends React.Component { 
  
  constructor() {
    super(); // call the constructor of parent class React.Component
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  // get movie list
  componentDidMount() {
    axios.get("https://myflixdb-kodeiak.herokuapp.com/movies")
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // update selectMovie state when movie is clicked
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // update user state to logged in user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    // object destruction same as: const movies = this.state.movies;
    const { movies, selectedMovie, user } = this.state;

    // if there is no user, render LoginView
    if (!user) return <LoginView onLoggedIn={ user => this.onLoggedIn(user)} />;

    // if register button is clicked, render RegistrationView
    // return <RegistrationView />

    if (movies.length === 0) return <div className="main-view" />;
    
      return (
        <div className="main-view">
          {selectedMovie
            ? <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            : movies.map( movie => (<MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} /> ))
          }
        </div>
      );
  }

}

MainView.propTypes = {
  movies: PropTypes.array,
  selectedMovie: PropTypes.func,
  user: PropTypes.shape ({
    username: PropTypes.string,
    password: PropTypes.string
  })
}



