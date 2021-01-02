import React, { useContext } from "react";
import { UserContext } from "../../containers/contexts/UserContext";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const NavbarMain = styled.div`
  text-align: center;
`;

const NavbarTitle = styled.h1`
  color: black;
  font-size: 4em;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;

const NavbarLinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 5px;
`;

const NavbarLink = styled(Link)`
  color: black;
  text-decoration: none;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  padding: 10px;
  font-weight: bold;
  font-size: 2em;
  border-radius: 20px;
  visibility: ${(props) =>
    useLocation().pathname === props.to ? "hidden" : ""};
  &:hover {
    color: green;
  }
`;

const Navbar = (props) => {
  const currentUser = useContext(UserContext)[0];

  return (
    <NavbarMain currentUser={currentUser}>
      <NavbarTitle>Lara Mail</NavbarTitle>
      <NavbarLinksContainer>
        <React.Fragment>
          <NavbarLink to="/">Main Page</NavbarLink>
          <NavbarLink to="/registration">Registration</NavbarLink>
          <NavbarLink to="/login">Login</NavbarLink>
          <div>
            {currentUser.username
              ? "Logged in as  " + currentUser.username
              : "Not logged in"}
          </div>
        </React.Fragment>
      </NavbarLinksContainer>
    </NavbarMain>
  );
};

export default Navbar;
