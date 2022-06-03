import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

export class GenreView extends React.Component {

  render() {
    const { genre, movieData, onBackClick } = this.props;

    let genreCards = movieData.map( m => (
      <Col md={3} key={m._id}>
        <MovieCard movieData={m} />
      </Col>
    ))
  

    return (
      <Container>
        <Row>
          <Col>
            {genre.name}
          </Col>
        </Row>
        <Row>
          <Col>
            {genreCards}
          </Col>
        </Row>
      </Container>
  )
  }
}