import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

export class DirectorView extends React.Component {

  render() {
    const { director, movieData, onBackClick } = this.props;

    let directorCards = movieData.map( m => (
      <Col md={3} key={m._id}>
        <MovieCard movieData={m} />
      </Col>
    ))
  

    return (
      <Container>
        <Row>
          <Col>
            {director.name}
          </Col>
        </Row>
        <Row>
          <Col>
            {directorCards}
          </Col>
        </Row>
      </Container>
  )
  }
}