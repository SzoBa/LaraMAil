import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UsePostData from "../../hooks/UsePostData";
import { UserContext } from "../../containers/contexts/UserContext";

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
          history.push("/mail/inbox");
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
    <div>
      <h1>This is the login page</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="text" name="password" />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        {errorMessage === null
          ? ""
          : errorMessage.map((data, index) => <p key={index}>{data}</p>)}
      </div>
    </div>
  );
};

export default LoginPage;
