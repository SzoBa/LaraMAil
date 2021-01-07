import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UsePostData from "../../hooks/UsePostData";
import { UserContext } from "../../containers/contexts/UserContext";
import MDEditor from "@uiw/react-md-editor";

const ComposePage = (props) => {
  const history = useHistory();
  const user = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState([]);
  const [value, setValue] = useState("**Markdown Syntax!!!**");

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailObject = {
      name: event.target.elements.address.value,
      subject: event.target.elements.subject.value,
      message: value,
    };

    UsePostData(
      "http://laramail.com/api/mail",
      user.token,
      emailObject,
      (response) => {
        setErrorMessage([]);
        if (response.status === 201) {
          setErrorMessage(response.data);
          history.push("/mail/inbox");
        }

        Object.entries(response).forEach(([k, v]) => {
          if (v instanceof Array) {
            v.forEach((value) => {
              setErrorMessage((old) => [...old, value]);
            });
          } else {
            setErrorMessage((old) => [...old, v]);
          }
        });
      }
    );
  };

  return (
    <div>
      <h1>This is the e-mail sending page</h1>
      <form method="put" onSubmit={handleSubmit}>
        <div>
          <div>
            <label>
              Send to user:
              <input type="text" name="address" />
            </label>
          </div>
          <div>
            <label>
              Subject:
              <input type="text" name="subject" />
            </label>
          </div>
          <div className="container" name="emailText">
            <MDEditor value={value} onChange={setValue} />
            {/* <MDEditor.Markdown source={value} /> */}
          </div>
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

export default ComposePage;
