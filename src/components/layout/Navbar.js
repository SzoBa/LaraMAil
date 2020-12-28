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
  padding-left: 3%;
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
    <NavbarMain className="navBar" currentUser={currentUser}>
      <NavbarTitle>Lara Mail</NavbarTitle>
      <NavbarLinksContainer>
        <React.Fragment>
          <NavbarLink to="/">Main Page</NavbarLink>
          <NavbarLink currentUser={currentUser} to="/registration">
            Registration
          </NavbarLink>
          {currentUser.username === "Guest" ? (
            <NavbarLink currentUser={currentUser} to="/">
              Guest to Main Fun:D
            </NavbarLink>
          ) : (
            ""
          )}
        </React.Fragment>
        <div>Logged in as {currentUser.username}</div>
      </NavbarLinksContainer>
    </NavbarMain>
  );
};

export default Navbar;
