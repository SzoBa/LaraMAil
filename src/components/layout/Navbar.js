import React, { useContext } from "react";
import { UserContext } from "../../containers/contexts/UserContext";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const NavbarMain = styled.div`
  text-align: center;
`;

const NavbarTitle = styled.h1`
  color: black;
  font-size: 2em;
  font-weight: bold;
  margin: 0 auto;
  padding-top: 1%;
  padding-left: 50px;
`;

const NavbarLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: #d56a6a;
  border: 1px solid black;
`;

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  font-weight: bold;
  font-size: 1em;
  border-radius: 20px;
  visibility: ${(props) =>
    useLocation().pathname === props.to ? "hidden" : ""};
  &:hover {
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    color: white;
    text-decoration: none;
  }
`;

const UserDiv = styled.div`
  padding: 10px;
  font-size: 1em;
  border-radius: 20px;
  border: 1px solid black;
  background-color: #f7cfcf;
`;

const LinksDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Navbar = (props) => {
  const currentUser = useContext(UserContext)[0];

  return (
    <NavbarMain currentUser={currentUser}>
      <NavbarLinksContainer>
        <React.Fragment>
          <LinksDiv>
            <NavbarLink to="/">Main Page</NavbarLink>
            <NavbarLink to="/registration">Registration</NavbarLink>
            <NavbarLink to="/login">Login</NavbarLink>
            <NavbarLink to={currentUser.token ? "/logout" : ""}>
              Logout
            </NavbarLink>
          </LinksDiv>
          {currentUser.username ? (
            <UserDiv style={{ fontWeight: "bold" }}>
              Logged in as {currentUser.username}
            </UserDiv>
          ) : (
            <UserDiv style={{ fontStyle: "italic" }}>Not logged in</UserDiv>
          )}
        </React.Fragment>
      </NavbarLinksContainer>
      <NavbarTitle>Lara Mail</NavbarTitle>
    </NavbarMain>
  );
};

export default Navbar;
