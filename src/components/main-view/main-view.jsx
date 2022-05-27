import React from "react";
import axios from "axios";
import propTypes from "prop-types";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import { Row, Col, Button, Container } from "react-bootstrap";

// create and render MainView class component from React.Component
export class MainView extends React.Component { 
  
  constructor() {
    super(); // call the constructor of parent class React.Component
    this.state = {
      movies: [],
      user: null
    };
  }

  // get movie list
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
    // axios.get("https://myflixdb-kodeiak.herokuapp.com/movies")
    //   .then(response => {
    //     this.setState({
    //       movies: response.data
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  // update selectMovie state when movie is clicked
  // setSelectedMovie(movie) {
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }

  // update user state to logged in user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get("https://myflixdb-kodeiak.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    // object destruction same as: const movies = this.state.movies;
    const { movies, user } = this.state;

    // if there is no user, render LoginView
    if (!user) return 
      <Row>
        <Col>
          <LoginView onLoggedIn={ user => this.onLoggedIn(user)} />
        </Col>
      </Row>    

    if (movies.length === 0) return <div className="main-view" />;
    
      return (
        <Router>
          <Row>
            <Col>
              <Button onClick={() => {this.onLoggedOut()}}>Logout</Button>
            </Col>
          </Row>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            <Route path="/movies/:movieId" render={({ match }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
              </Col>
            }} />
          </Row>
        </Router>
      );
  }

}

MainView.propTypes = {
  movies: propTypes.array,
  selectedMovie: propTypes.func,
  user: propTypes.shape ({
    username: propTypes.string,
    password: propTypes.string
  })
}



