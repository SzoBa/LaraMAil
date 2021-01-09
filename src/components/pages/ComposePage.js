import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UsePostData from "../../hooks/UsePostData";
import { UserContext } from "../../containers/contexts/UserContext";
import MDEditor from "@uiw/react-md-editor";
import UsePutData from "../../hooks/UsePutData";

const ComposePage = (props) => {
  const history = useHistory();
  const user = useContext(UserContext)[0];
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [value, setValue] = useState("**Markdown Syntax!!!**");

  let sendOrSave = "save";

  useEffect(() => {
    if (redirect) {
      setTimeout(() => history.push("/mail/inbox"), 1500);
    }
  }, [redirect, history]);

  const clickHandler = (event) => {
    sendOrSave = event.target.name;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailObject = createEmailObject(event, value);
    UsePostData(
      "http://laramail.com/api/mail",
      user.token,
      emailObject,
      (response) => {
        setErrorMessage([]);
        if (response.status === 201) {
          sendOrSave === "send"
            ? sendEmail(response, user, history, setErrorMessage)
            : (response = saveEmail(setRedirect, response));
        }

        handleErrorMessages(response, setErrorMessage);
      }
    );
  };

  return (
    <div>
      <h1>This is the e-mail sending page</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" name="save" onClick={clickHandler}>
          Save email
        </button>
        <button type="submit" name="send" id="send" onClick={clickHandler}>
          Send mail
        </button>
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

function createEmailObject(event, value) {
  return {
    name: event.target.elements.address.value,
    subject: event.target.elements.subject.value,
    message: value,
  };
}

function handleErrorMessages(response, setErrorMessage) {
  if (!response.data) {
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
}

function saveEmail(setRedirect, response) {
  document.querySelector("#send").setAttribute("disabled", "true");
  setRedirect(true);
  response = { message: "Save successful!" };
  return response;
}

function sendEmail(response, user, history, setErrorMessage) {
  UsePutData(
    `http://laramail.com/api/mail/${response.data.id}`,
    user.token,
    { sent: true },
    (putResponse) => {
      if (putResponse.status === 204) {
        return history.push("/mail/inbox");
      } else {
        setErrorMessage(["Sent failed!"]);
      }
    }
  );
}
