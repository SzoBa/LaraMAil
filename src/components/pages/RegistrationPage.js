import React from "react";
import { useHistory } from "react-router-dom";
import UsePostData from "../../hooks/UsePostData";

const RegistrationPage = (props) => {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObject = {
      username: event.target.elements.username.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    UsePostData("http://laramail.com/api/register", userObject, (response) => {
      console.log(response);
    });

    history.push("/");
  };

  return (
    <div>
      <h1>This is the registration page</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
        </div>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
