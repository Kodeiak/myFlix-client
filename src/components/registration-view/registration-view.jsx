import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col, Card, CardGroup } from "react-bootstrap";

export function RegistrationView(props) {
  const [ email, setEmail ] = useState("");
  const [ birthday, setBirthday ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, birthday, username, password);
    /* send a request to the server for authentication
    then call pros.onLoggIn(username) */
    props.onLoggedIn(username);
  }

  return (
    <Row>
      <Col>
        <Form>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" value={email} onChange={ e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" value={birthday} onChange={ e => setBirthday(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={username} onChange={ e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Col>
    </Row>
  );  
} 

RegistrationView.propTypes = {
  email: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date).isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};