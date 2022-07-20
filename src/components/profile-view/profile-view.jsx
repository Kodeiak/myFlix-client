import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { MovieCard } from "../movie-card/movie-card";
import { UserDataForm } from "../user-data-form/user-data-form";

import { setUser } from "../../actions/actions";

import "./profile-view.scss";

export function ProfileView(match, props) {

  console.log("match", match, "props", props);
  // const { user, movieData } = props;
  const { movieData, favorites } = match;
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const [ userData, setUserData ] = useState("");
  const [ favoriteMovies, setFavoriteMovies ] = useState([""]);

  const { username, birthday, email, password } = userData;

  // similar to componentDidMount, once per render
  useEffect(() => {
    let accessToken = localStorage.getItem("token");
    // this.props.setUser(localStorage.getItem("user"));
    console.log("did mount", accessToken, user);
    getUser(accessToken, user);
  }, []);

  // similar to componentDidUpdate
  useEffect(() => {
    // don't run unless userData has value
    if (!userData) {
      return
    }
    console.log("didUpdate", userData);
    setFavoriteMovies(movieData.filter( m => userData.favoriteMovies.indexOf(m._id) > -1));
    console.log(movieData, favoriteMovies);
  }, [userData]);

  const getUser = (token, user) => {
    axios.get(`https://myflixdb-kodeiak.herokuapp.com/users/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUserData(response.data);
      console.log("get user", response.data, userData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      ...userData,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      birthday: e.target.birthday.value
    }
    console.log(newUserData);
    console.log("this will send post request");

    axios.put(`https://myflixdb-kodeiak.herokuapp.com/users/${user}`, newUserData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      localStorage.setItem("user", data.username);
      alert("User details have been successfully updated.");
    })
    .catch ( e => {
      alert("Update failed");
    });
  }

  const handleDelete = () => {
    console.log("this will delete profile");
    axios.delete(`https://myflixdb-kodeiak.herokuapp.com/users/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // const data = response.data;
      // console.log(data);
      localStorage.setItem("user", "");
      alert("User profile has been successfully deleted.");
      location.reload();
    })
    .catch ( e => {
      alert("Update failed");
    });
  }
  // allow users to remove favorite movies

   
  let favoriteCards = favoriteMovies.map( m => (
    <Col md={3} key={m._id}> 
      <MovieCard movieData={m} favorites={favorites} />
    </Col>
  ))  

  if (!userData) {
    return <div>Loading...</div>
  }

  return (

    <Container>
      <UserDataForm username={userData.username} password={userData.password} email={userData.email}  birthday={userData.birthday} userData={userData} handleSubmit={handleSubmit} />

      <Row>
        <Col>
          <Button className="delete-btn" onClick={handleDelete}>Delete Profile</Button> 
        </Col>
      </Row>

      <Row>
          {favoriteCards}
      </Row>
    </Container>
  )
}

// making states available as props in the component
const mapStateToProps = state => {  
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser } )(ProfileView);

// ProfileView.propTypes