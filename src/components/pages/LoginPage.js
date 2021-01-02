import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UsePostData from "../../hooks/UsePostData";

const LoginPage = (props) => {
  const history = useHistory();
  const [loginError, setLoginError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const userObject = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
    };
    UsePostData("http://laramail.com/api/login", userObject, (response) => {
      if (response.status === 200) {
        setLoginError("");
        history.push("/");
      } else {
        setLoginError("Error ocurred");
      }
    });

    history.push("/");
  };

  return (
    <div>
      <h1>This is the login page</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input type="text" name="username" />
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
      <div>{loginError}</div>
    </div>
  );
};

export default LoginPage;
