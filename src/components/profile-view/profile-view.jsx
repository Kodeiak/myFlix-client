import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Row, Col, Button } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import { UserDataForm } from "../user-data-form/user-data-form";

import "./profile-view.scss";

export function ProfileView(props) {

  const { user, movieData } = props;

  const [ userData, setUserData ] = useState("");
  const [ favoriteMovies, setFavoriteMovies ] = useState([""]);
  // const [ password, setPassword ] = useState("");
  // const [ email, setEmail ] = useState("");
  // const [ birthday, setBirthday ] = useState("");
  
  // const [ usernameErr, setUsernameErr ] = useState("");
  // const [ passwordErr, setPasswordErr ] = useState("");
  // const [ emailErr, setEmailErr ] = useState("");
  // const [ birthdayErr, setBirthdayErr ] = useState("");

  useEffect(() => {
    let accessToken = localStorage.getItem("token");
    // console.log("did mount", accessToken, user);
    getUser(accessToken, user);
  }, []);

  useEffect(() => {
    // console.log("didUpdate", userData);
    setFavoriteMovies(movieData.filter( m => userData.favoriteMovies.indexOf(m._id) > -1));
    // console.log(movieData, favoriteMovies);
  }, [userData]);

  function getUser(token, user) {
    axios.get(`https://myflixdb-kodeiak.herokuapp.com/users/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUserData(response.data);
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }  

  function handleSubmit()  {
    e.preventDefault();
    console.log("this will send post request");
    // axios.post("https://myflixdb-kodeiak.herokuapp.com/users", {
    //   username: username,
    //   password: password,
    //   email: email,
    //   birthday: birthday
    // })
    // .then(response => {
    //   const data = response.data;
    //   console.log(data);
    //   alert("User details have been successfully updated.");
    //   // render login screen
    //   window.open("/", "_self"); // "_self" opens new page on current tab
    // })
    // .catch ( e => {
    //   alert("Update failed");
    // });
  }
  // allow user to change their data (send post/put request upon submission)
    // onSubmit
    // form validation - ensure data is in correct format

  // allow users to remove favorite movies

   
  let favoriteCards = favoriteMovies.map( m => (
    <Col md={3} key={m._id}> 
      <MovieCard movieData={m} />
    </Col>
  ))  

  if (!userData) {
    return <div>Loading...</div>
  }
  return (

    <Container>
      <UserDataForm username={userData.username} password={userData.password} email={userData.email}  birthday={userData.birthday} handleSubmit={handleSubmit} />

      <Row>
        <Col>
          <Button className="delete-btn">Delete Profile</Button> 
        </Col>
      </Row>

      <Row>
          {favoriteCards}
      </Row>
    </Container>
  )
}