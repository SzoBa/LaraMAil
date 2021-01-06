import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UsePutData from "../../hooks/UsePutData";
import MDEditor from "@uiw/react-md-editor";

const ComposePage = (props) => {
  const history = useHistory();
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailObject = {
      username: event.target.elements.address.value,
      email: event.target.elements.emailText.value,
    };
    UsePutData("", emailObject, (response) => {
      if (response.status === 201) {
        setEmailError("");
        history.push("/");
      } else {
        setEmailError("Error occurred");
      }
    });
  };

  const [value, setValue] = useState("**Hello world!!!**");

  return (
    <div>
      <h1>This is the e-mail sending page</h1>
      <form method="put" onSubmit={handleSubmit}>
        <div>
          <label>
            Send to user:
            <input type="text" name="address" />
            <div className="container" name="emailText">
              <MDEditor value={value} onChange={setValue} />
              <MDEditor.Markdown source={value} />
            </div>
          </label>
        </div>
        <button type="submit">Send email</button>
      </form>
      <div>{emailError}</div>
    </div>
  );
};

export default ComposePage;
