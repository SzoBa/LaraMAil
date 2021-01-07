import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UsePutData from "../../hooks/UsePutData";

const DraftPage = (props) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  const [value, setValue] = useState("**Markdown Syntax!!!**");

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailObject = {
      name: event.target.elements.address.value,
      message: value,
    };

    UsePutData("http://laramail.com/api/login", emailObject, (response) => {
      if (response.status === 201) {
        // setErrorMessage([]);
        //TODO add message
        history.push("/mail/inbox");
      }
      Object.entries(response).forEach(([k, v]) => {
        v.forEach((value) => {
          setErrorMessage((old) => [...old, value]);
        });
      });
    });
  };

  return (
    <div>
      <h1>This is the e-mail sending page</h1>
      <form method="put" onSubmit={handleSubmit}>
        <div>
          <label>
            Send to user:
            <input type="text" name="address" />
          </label>
        </div>
        <div>
          <label>
            Text:
            <textarea type="text" name="emailText"></textarea>
          </label>
        </div>
        <button type="submit">Send email</button>
      </form>
      <div>
        {errorMessage === null
          ? ""
          : errorMessage.map((data, index) => <p key={index}>{data}</p>)}
      </div>
    </div>
  );
};

export default DraftPage;
