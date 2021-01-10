import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UsePostData from "../../hooks/UsePostData";
import { UserContext } from "../../containers/contexts/UserContext";
import styled from "styled-components";
import "../../style/Forms.css";

const LoginPageDiv = styled.div`
  text-align: center;
  padding-left: 50px;
`;

const LoginPage = (props) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  const [user, setUser] = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObject = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    UsePostData(
      "http://laramail.com/api/login",
      user.token,
      userObject,
      (response) => {
        setErrorMessage([]);
        if (response.status === 201) {
          setUser({
            username: response.data.username,
            token: response.data.token,
          });
          return history.push("/mail/inbox");
        }
        Object.entries(response).forEach(([k, v]) => {
          v.forEach((value) => {
            setErrorMessage((old) => [...old, value]);
          });
        });
      }
    );
  };

  return (
    <LoginPageDiv>
      <div id="main_login">
        <div id="content_div_login">
          <h2>Login</h2>
          <form method="post" onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" name="email" />
            <label>Password: </label>
            <input type="text" name="password" />
            <button type="submit">Login</button>
          </form>
          <div>
            {errorMessage === null
              ? ""
              : errorMessage.map((data, index) => <p key={index}>{data}</p>)}
          </div>
        </div>
      </div>
    </LoginPageDiv>
  );
};

export default LoginPage;
