import React from "react";
import axios from "axios";
import propTypes from "prop-types";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Row, Col, } from "react-bootstrap";


import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { NavbarView } from "../navbar-view/navbar-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import MoviesList from "../movies-list/movies-list";

import { setMovies, setUser, setFavorites } from "../../actions/actions";

// create and render MainView class component from React.Component
export class MainView extends React.Component { 
  
  // update user state to logged in user
  onLoggedIn(authData) {
    this.props.setUser(authData.user.username);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
    this.getFavorites(authData.token);
  }

  getMovies(token) {
    axios.get("https://myflixdb-kodeiak.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getFavorites(token) {
    console.log("get favorites");
    let user = this.props.user;
    axios.get(`https://myflixdb-kodeiak.herokuapp.com/users/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then( response => {
        this.props.setFavorites(response.data.favoriteMovies);
        console.log(response.data.favoriteMovies);
      })
      .catch( e => console.log(e));
  }

    // get movie list
    componentDidMount() {
      let accessToken = localStorage.getItem("token");
      if (accessToken !== null) {
        this.getMovies(accessToken);
        this.props.setUser(localStorage.getItem("user"));
        this.getFavorites(accessToken);
      }
    };

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser("");
  }

  render() {
    // object destruction same as: const movies = this.state.movies;
    let { movies, user, favorites } = this.props;

    return (

      <Router>
        <NavbarView user={user} onLoggedOut={ () => {this.onLoggedOut();} } />

        {/* Home Route */}
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            // if there is no user, render LoginView
            if (!user) return (
            <Col>
                <LoginView onLoggedIn={ user => this.onLoggedIn(user)} />
            </Col>
            )

            if (movies.length === 0) return <div className="main-view" />;

            // #6
            return <MoviesList movies={movies} user={user} favorites={favorites} />
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col md={8}>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            // if there is no user, render LoginView
            if (!user) return (
            <Col>
                <LoginView onLoggedIn={ user => this.onLoggedIn(user)} />
            </Col>
            )
            return <Col md={8}>
              <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/genres/:name" render={({ match }) => {
            // if there is no user, render LoginView
            if (!user) return (
            <Col>
                <LoginView onLoggedIn={ user => this.onLoggedIn(user)} />
            </Col>
            )
            if (movies.length === 0) return <div className="main-view" />
            return (
              <Col>
                <GenreView 
                  genre={
                    movies.find( m => m.genre.name === match.params.name).genre
                  }

                  movieData={
                    movies.filter(m => m.genre.name === match.params.name)
                  }

                  onBackClick={() => history.goBack()} 
                />
              </Col>
            )
          }} />

          {/* Director View */}
          <Route path="/directors/:name" render={({ match }) => {
            // if there is no user, render LoginView
            if (!user) return
            <Col>
                <LoginView onLoggedIn={ user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <Col md={8}>
              <DirectorView
                director={
                  movies.find(m => m.director.name === match.params.name).director} 
                  
                movieData={
                    movies.filter(m => m.director.name === match.params.name)
                  }
                  
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* Profile */}
          <Route 
            path={"/users/:user"} 
            render={({ match, history }) => {
              if (!user) return (
                <Col>
                    <LoginView onLoggedIn={ user => this.onLoggedIn(user)} />
                </Col>
                )
              return <Col md={12}>
                <ProfileView 
                  user={user}
                  movieData={movies}
                  favorites={favorites}
                />
              </Col>
          }} />
        </Row>
      </Router>
    );
  }

}

// #7
let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    favorites: state.favorites,
    user: state.user
   }
};

// #8
export default connect(mapStateToProps, { setMovies, setUser, setFavorites } )(MainView);

MainView.propTypes = {
  movies: propTypes.array,
  selectedMovie: propTypes.func,
  user: propTypes.shape ({
    username: propTypes.string,
    password: propTypes.string
  })
}



