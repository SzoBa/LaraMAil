import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UseGetData from "../../hooks/UseGetData";
import UsePutData from "../../hooks/UsePutData";
import { UserContext } from "../../containers/contexts/UserContext";
import styled from "styled-components";
import UseDeleteData from "../../hooks/UseDeleteData";

const Row = styled.tr`
  font-weight: ${(props) => (props.isRead ? "" : "bold")};
`;

const InboxPage = (props) => {
  const history = useHistory();
  const user = useContext(UserContext)[0];
  const [errorMessage, setErrorMessage] = useState([]);
  const mailData = UseGetData(
    "http://laramail.com/api/mail",
    user.token,
    setErrorMessage
  )[1];

  const editClickHandler = (event, props) => {
    UsePutData(
      `http://laramail.com/api/mail/${props.id}`,
      user.token,
      { is_read: true },
      (response) => {
        if (response.status === 204) {
          return history.push(`/mail/view/${props.id}`);
        }
        Object.entries(response).forEach(([k, v]) => {
          v.forEach((value) => {
            setErrorMessage((old) => [...old, value]);
          });
        });
      }
    );
  };

  const deleteClickHandler = (e, id) => {
    e.stopPropagation();
    e.currentTarget.closest("tr").remove();
    UseDeleteData(
      `http://laramail.com/api/mail/${id}`,
      user.token,
      (response) => {
        if (response.status === 204) {
          return history.push(`/mail/inbox`);
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
      <h1>This is the inbox page</h1>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Message</th>
            <th>Author</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(mailData).map((key, index) => (
            <Row
              onClick={(e) => editClickHandler(e, mailData[key])}
              key={index}
              isRead={mailData[key]["is_read"]}
            >
              <td>{mailData[key]["subject"]}</td>
              <td>{mailData[key]["message"].split(" ")[0]}... </td>
              <td>{mailData[key]["name"]}</td>
              <td>{mailData[key]["created"]}</td>
              <td>
                <button
                  type="button"
                  onClick={(e) => deleteClickHandler(e, mailData[key]["id"])}
                >
                  Delete
                </button>
              </td>
            </Row>
          ))}
        </tbody>
      </table>
      <div>
        {Object.keys(errorMessage).map((key, index) => (
          <p key={index}>{errorMessage[key]}</p>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;
