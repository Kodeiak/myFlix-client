import React, { useState } from "react";
import axios from "axios";

import { Form, Card, Button } from "react-bootstrap";

export function UserDataForm(props) {

  // MOVE THIS TO PARENT PROFILE VIEW

  
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
  
  

  function handleSubmit(e) {
    props.handleSubmit(e.target.value);
  }
  // render() {
  const { username, password, email, birthday } = props;
  const bday = new Date(birthday);

  return (
    <Card>
      <Card.Body>
        <Card.Title>User Details</Card.Title>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" defaultValue={username} onChange={ e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" defaultValue={password} onChange={ e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" defaultValue={email} onChange={ e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="birthday" defaultValue={bday.getMonth() + "/" + bday.getDay() + "/" + bday.getFullYear()} onChange={ e => setBirthday(e.target.value)} />
          </Form.Group>
        </Form>
        <Button onSubmit={handleSubmit}>Submit</Button> 
      </Card.Body>
    </Card>
  )
  }