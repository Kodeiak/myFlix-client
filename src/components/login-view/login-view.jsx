import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
          <Button variant="outline-primary" type="button" onClick={handleRegister}>Register</Button>
        </Form.Group>
      </Form>
    );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};