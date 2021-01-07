import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../containers/contexts/UserContext";
import UsePostData from "../../hooks/UsePostData";

const RegistrationPage = (props) => {
  const history = useHistory();
  const [registrationError, setRegistrationError] = useState([]);
  const user = useContext(UserContext)[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObject = {
      name: event.target.elements.username.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      password_confirmation: event.target.elements.password_confirm.value,
    };
    UsePostData(
      "http://laramail.com/api/register",
      user.token,
      userObject,
      (response) => {
        setRegistrationError([]);
        if (response.status === 201) {
          history.push("/");
        }
        Object.entries(response).forEach(([k, v]) => {
          v.forEach((value) => {
            setRegistrationError((old) => [...old, k + ": " + value]);
          });
        });
      }
    );
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
        <div>
          <label>
            Confirm password:
            <input type="text" name="password_confirm" />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <div>
        {registrationError === null
          ? ""
          : registrationError.map((data, index) => <p key={index}>{data}</p>)}
      </div>
    </div>
  );
};

export default RegistrationPage;
