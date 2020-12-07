import React from "react";
import { Navbar, Nav, NavLink } from "react-bootstrap";
import logo from "../images/logo.svg";
import githubIco from "../images/github_icon.png";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <img src={logo} alt="CoderSchool" width="200px" />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/toprated">
          Top Rated
        </Nav.Link>
        <Nav.Link as={Link} to="/upcoming">
          Upcoming
        </Nav.Link>
      </Nav>
      <Nav>
        <a href="#your_github_repo_link" target="_blank">
          <img src={githubIco} alt="Github" width="32px" />
        </a>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;
