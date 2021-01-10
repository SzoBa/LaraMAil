import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UsePostData from "../../hooks/UsePostData";
import { UserContext } from "../../containers/contexts/UserContext";
import MDEditor from "@uiw/react-md-editor";
import UsePutData from "../../hooks/UsePutData";
import UseGetData from "../../hooks/UseGetData";
import styled from "styled-components";
import "../../style/EditAreas.css";

const ComposePageDiv = styled.div`
  text-align: center;
  padding-left: 50px;
`;

const ComposePage = (props) => {
  const history = useHistory();
  const user = useContext(UserContext)[0];
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [value, setValue] = useState("**Markdown Syntax!!!**");
  const [addressNames, setAddressNames] = useState([]);

  let sendOrSave = "save";

  const registeredUsernames = UseGetData(
    "http://laramail.com/api/user/list",
    user.token,
    setErrorMessage
  )[1];

  useEffect(() => {
    setAddressNames(registeredUsernames);
    if (redirect) {
      setTimeout(() => history.push("/mail/inbox"), 1500);
    }
  }, [registeredUsernames, redirect, history]);

  const clickHandler = (event) => {
    sendOrSave = event.target.name;
  };

  const copyNameClickHandler = (event) => {
    const nameSelector = document.querySelector("#nameSelector");
    const nameInput = document.querySelector("#address");
    nameInput.value = nameSelector.value;
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
    <ComposePageDiv>
      <div id="main_compose">
        <div id="content_compose">
          <h3>Compose mail</h3>
          <form onSubmit={handleSubmit}>
            <div id="helper_compose">
              <div id="helper_content1">
                <label>Send to user:</label>
                <input type="text" id="address" name="address" />
              </div>
              <div id="helper_content2">
                <label>Registered users:</label>
                <select id="nameSelector">
                  {addressNames.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="button" onClick={copyNameClickHandler}>
              Copy name
            </button>
            <br />
            <div id="subject_container">
              <label>Subject:</label>
              <input id="subject" type="text" name="subject" />
            </div>
            <div className="container" name="emailText">
              <MDEditor value={value} onChange={setValue} />
              {/* <MDEditor.Markdown source={value} /> */}
            </div>
            <button type="submit" name="save" id="save" onClick={clickHandler}>
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
      </div>
    </ComposePageDiv>
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
