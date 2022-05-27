import React from "react";
import propTypes from "prop-types";

import { Row, Col, Button } from "react-bootstrap";

export class MovieView extends React.Component {

  render() {
    const { movieData, onBackClick } = this.props;

    return (
      <Row className="movie-view">
        <Col>
          <div className="movie-poster">
            <img src={movieData.imagePath} />
          </div>
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movieData.title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movieData.description}</span>
          </div>
          {/* <Button onClick={() => onBackClick(null)} >Back</Button> */}
          <Link to={`/directors/${movieData.director.name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movieData.genre.name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </Col>
      </Row>
      );
  }
}

MovieView.propTypes = {
  movieData: propTypes.shape({
    title: propTypes.string.isRequired,
    imagePath: propTypes.string.isRequired,
    description: propTypes.string.isRequired
  }).isRequired,
  onBackClick: propTypes.func.isRequired
};