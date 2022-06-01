import React from "react";

import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

export function Navbar(props) {
  const { user, onLoggedOut } = props;

  if (!user) return (    
    <Navbar>
      <Container>
        <Navbar.Brand>
          <NavLink href="/">
            myFlix
          </NavLink>
        </Navbar.Brand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/" >Sign In</NavLink>
            <NavLink href="/register" >Register</NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
    )

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <NavLink href="/">
            myFlix
          </NavLink>
        </Navbar.Brand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/" >Home</NavLink>
            <NavLink href="/profile/${user}">Profile</NavLink>
            <NavLink href="/" onClick={ () =>{ onLoggedOut(); }} >Sign Out</NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}