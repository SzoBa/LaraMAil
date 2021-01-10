import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UseGetData from "../../hooks/UseGetData";
import UsePutData from "../../hooks/UsePutData";
import { UserContext } from "../../containers/contexts/UserContext";
import { MailContext } from "../../containers/contexts/MailContext";
import styled from "styled-components";
import UseDeleteData from "../../hooks/UseDeleteData";
import { Table, Button } from "metro4-react";

const Row = styled.tr`
  font-weight: ${(props) => (props.isRead ? "" : "bold")};
  cursor: pointer;
`;

const InboxPage = (props) => {
  const history = useHistory();
  const user = useContext(UserContext)[0];
  const [mailInfo, setMailInfo] = useContext(MailContext);
  const [errorMessage, setErrorMessage] = useState([]);

  const mailData = UseGetData(
    "http://laramail.com/api/mail",
    user.token,
    setErrorMessage
  )[1];

  const mailCount =
    mailData.length > 0
      ? Object.values(mailData)
          .map((mail) => (mail.is_read === 1 ? 0 : 1))
          .reduce((a, b) => a + b, 0)
      : 0;

  useEffect(() => {
    setMailInfo({
      unread: mailCount,
    });
  }, [setMailInfo, mailCount]);

  const editClickHandler = (event, props) => {
    setMailInfo((oldInfo) => ({ unread: oldInfo.unread - 1 }));
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

  const markUnreadClickHandler = (e, props) => {
    e.stopPropagation();
    props.is_read = false;
    UsePutData(
      `http://laramail.com/api/mail/${props.id}`,
      user.token,
      { is_read: false },
      (response) => {
        if (response.status === 204) {
          return setErrorMessage({ message: "E-mail marked as unread." });
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
    setMailInfo((oldInfo) => ({ unread: oldInfo.unread - 1 }));
    UseDeleteData(
      `http://laramail.com/api/mail/${id}`,
      user.token,
      (response) => {
        if (response.status === 204) {
          return setErrorMessage({ message: "Delete successful!" });
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
      <h1>Inbox</h1>
      <Table cls="table-border">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Message</th>
            <th>Author</th>
            <th>Created at</th>
            <th>Delete</th>
            <th>Mark as unread</th>
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
                <Button
                  icon="bin"
                  cls="light mini rounded"
                  type="button"
                  onClick={(e) => deleteClickHandler(e, mailData[key]["id"])}
                />
              </td>
              <td>
                <Button
                  cls="light mini rounded"
                  type="button"
                  onClick={(e) => markUnreadClickHandler(e, mailData[key])}
                >
                  Mark as unread
                </Button>
              </td>
            </Row>
          ))}
        </tbody>
      </Table>

      <div>
        {Object.keys(errorMessage).map((key, index) => (
          <p key={index}>{errorMessage[key]}</p>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;
