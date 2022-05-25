import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col, Card, CardGroup } from "react-bootstrap";

import "./login-view.scss";

export function LoginView(props) {
  const [ username, setUsername ] = useState(""); // first value is current state. second value is method (function) to update state. initial state is set to ""
  const [ password, setPassword ] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    /* send a request to the server for authentication
    then call pros.onLoggIn(username) */
    props.onLoggedIn(username);
  }

  const handleRegister = e => {
    e.preventDefault();
    console.log("this will take you to get registered");
    /* load RegistrationView */
  }

    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Login</Card.Title>
                <Form className="login-form">
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                  <Button variant="outline-primary" type="button" onClick={handleRegister}>Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};