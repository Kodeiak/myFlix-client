import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Image } from "react-bootstrap";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { setFavorites } from "../../actions/actions";

import "./movie-card.scss";
import heartEmpty from "../../img/heart-empty.png";
import heartFull from "../../img/heart-full.png"
import axios from "axios";

export function MovieCard(props) {

    const { movieData, favorites } = props;
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    const addFavorite = movieId => {
      axios.put(`https://myflixdb-kodeiak.herokuapp.com/users/${user}/movies/${movieId}`, null, {
        headers: { Authorization: `Bearer ${token}`}
      })
        .then((response) => {
          setFavorites(response.data.favoriteMovies);
          alert("The movie was successfully added to your list.");
          location.reload();
        })
        .catch(error => console.error(error.response.data))
    }

    const removeFavorite = movieId => {
      axios.delete(`https://myflixdb-kodeiak.herokuapp.com/users/${user}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
        .then(() => {
          setFavorites(favorites.filter(favId => favId != movieId))
          alert("The movie was successfully deleted from your list.")
          location.reload();
        })
        .catch(error => console.error(error))
    }

    const favMovieClick = e => {
      const movId = movieData._id;
      if (favorites.includes(movId)) {
        removeFavorite(movId);
      } else {
        addFavorite(movId);
      }
    }

    function handleFav(movieId) {
      if (favorites.includes(movieId)) {
        return heartFull;
      } else {
        return heartEmpty;
      }
    }

    return (
      <Card className="movie-card">
        <Card.Img crossOrigin="anonymous" className="text-center" variant="top" src={`${movieData.imagePath}?api_key=5db1e95848502c6cd6dcce7029e3c9b0`} width={50} height={300} />
        <a href="#" onClick={e => favMovieClick(e)} >
          <img id="fav-heart" src={handleFav(movieData._id)} />
        </a>
        <Card.Body>
          {/* <Image src="../heart-empty.a93ca4aa.png" className="fav-icon" /> */}
          <Card.Title>{movieData.title}</Card.Title>
          {/* <Card.Text>{movieData.description}</Card.Text> */}

          <Link to={`/movies/${movieData._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    favorites: state.favorites,
    user: state.user
  }
};

export default connect(mapStateToProps, { setFavorites })(MovieCard);

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birth: PropTypes.instanceOf(Date),
      death: PropTypes.instanceOf(Date)
    }),
    actors: PropTypes.arrayOf(PropTypes.string),
    feature: PropTypes.bool
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};