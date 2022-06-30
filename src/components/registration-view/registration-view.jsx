import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col, Card, CardGroup } from "react-bootstrap";
import axios from "axios";

export function RegistrationView(props) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ birthday, setBirthday ] = useState("");

  const [ usernameErr, setUsernameErr ] = useState("");
  const [ passwordErr, setPasswordErr ] = useState("");
  const [ emailErr, setEmailErr ] = useState("");
  const [ birthdayErr, setBirthdayErr ] = useState("");

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

    if (!email) {
      setEmailErr("Email Required");
      isReq = false;
    } 

    if (!birthday) {
      setBirthdayErr("Birthday Required")
      isReq = false;
    }

    return isReq;
  }

  const handleRegister = e => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
          /* send a request to the server for authentication
    then call pros.onLoggIn(username) */
    axios.post("https://myflixdb-kodeiak.herokuapp.com/users", {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    }
  )
  .then(response => {
    const data = response.data;
    console.log(data);
    alert("Registration successful. Please login.");
    // render login screen
    window.open("/", "_self"); // "_self" opens new page on current tab
  })
  .catch ( e => {
    alert("Registration failed");
  });
    } else {
      alert(usernameErr, passwordErr, emailErr, birthdayErr);
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Sign Up</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={username} onChange={ e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="text" value={email} onChange={ e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" value={birthday} onChange={ e => setBirthday(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
          </Form>
      </Card.Body>
    </Card>
  );  
} 

RegistrationView.propTypes = {
  email: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date).isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};