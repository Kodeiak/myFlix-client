import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;
    // console.log(movieData);

    return (
      <Card className="movie-card">
        {/* <Card.Img variant="top" src={movieData.imagePath} /> */}
        <Card.Body>
          <Card.Title>{movieData.title}</Card.Title>
          {/* <Card.Text>{movieData.description}</Card.Text> */}
          <Link to={`/movies/${movieData._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    )
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