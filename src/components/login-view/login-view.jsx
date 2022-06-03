import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./login-view.scss";

export function LoginView(props) {
  const [ username, setUsername ] = useState(""); // first value is current state. second value is method (function) to update state. initial state is set to ""
  const [ password, setPassword ] = useState("");

  // declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState("");
  const [ passwordErr, setPasswordErr ] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username){
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username but be 5 characters or more");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be 6 characters or more");
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* send a request to the server for authentication
      then call pros.onLoggIn(username) */
      axios.post("https://myflixdb-kodeiak.herokuapp.com/login", null, {
        params: {
          Username: username,
          Password: password
        }
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch ( e => {
        alert("This user does not exist");
      });
    } else {
      console.log(usernameErr, passwordErr);
    }
  };

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
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                  <Link to={`/register`}>
                    <Button variant="link">Register</Button>
                  </Link>
                  {/* <Button variant="outline-primary" type="button" onClick={handleRegister}>Register</Button> */}
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