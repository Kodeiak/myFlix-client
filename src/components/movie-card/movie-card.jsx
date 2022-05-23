import React from "react";
import PropTypes from "prop-types";

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return <div className="movie-card" onClick={() => { onMovieClick(movieData); }} >{movieData.title}</div>;
  }
}

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