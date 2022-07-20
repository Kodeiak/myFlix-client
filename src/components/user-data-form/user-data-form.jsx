import React, { useState } from "react";
import axios from "axios";

import { Form, Card, Button } from "react-bootstrap";

export function UserDataForm(props) {

  const { username, password, email, birthday, handleSubmit } = props;
  const bday = new Date(birthday);

  return (
    <Card>
      <Card.Body>
        <Card.Title>User Details</Card.Title>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" name="username" defaultValue={username} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" defaultValue={password} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" defaultValue={email} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="birthday" name="birthday" defaultValue={bday.getMonth() + "/" + bday.getDay() + "/" + bday.getFullYear()}  />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button> 
        </Form>
      </Card.Body>
    </Card>
  )
  }

    // const { userData } = props;
  // const user = localStorage.getItem("user");
  // const token = localStorage.getItem("token");
  // MOVE THIS TO PARENT PROFILE VIEW

  // const [ username, setUsername ] = useState("");
  // const [ password, setPassword ] = useState("");
  // const [ email, setEmail ] = useState("");
  // const [ birthday, setBirthday ] = useState("");
  
  // const [ usernameErr, setUsernameErr ] = useState("");
  // const [ passwordErr, setPasswordErr ] = useState("");
  // const [ emailErr, setEmailErr ] = useState("");
  // const [ birthdayErr, setBirthdayErr ] = useState("");

  
  // // validate user inputs
  // const validate = () => {
  //   let isReq = true;

  //   if (!username){
  //     setUsernameErr("Username Required");
  //     isReq = false;
  //   } else if (username.length < 5) {
  //     setUsernameErr("Username but be 5 characters or more");
  //     isReq = false;
  //   }

  //   if (!password) {
  //     setPasswordErr("Password Required");
  //     isReq = false;
  //   } else if (password.length < 6) {
  //     setPasswordErr("Password must be 6 characters or more");
  //     isReq = false;
  //   }

  //   if (!email) {
  //     setEmailErr("Email Required");
  //     isReq = false;
  //   } 

  //   if (!birthday) {
  //     setBirthdayErr("Birthday Required")
  //     isReq = false;
  //   }

  //   return isReq;
  // }
  
  

  // const handleSubmit = e => {
  //   // console.log("user data console");
  //   props.handleSubmit(e.target.value);
  // }

  // render() {