import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UseGetData from "../../hooks/UseGetData";
import UsePutData from "../../hooks/UsePutData";
import UseDeleteData from "../../hooks/UseDeleteData";
import { UserContext } from "../../containers/contexts/UserContext";
import { Table, Button } from "metro4-react";

const DraftPage = (props) => {
  const history = useHistory();
  const user = useContext(UserContext)[0];
  const [errorMessage, setErrorMessage] = useState([]);
  const mailData = UseGetData(
    "http://laramail.com/api/mail-draft",
    user.token,
    setErrorMessage
  )[1];

  const deleteClickHandler = (e, id) => {
    e.stopPropagation();
    e.currentTarget.closest("tr").remove();
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
  const editClickHandler = (event, props) => {
    UsePutData(
      `http://laramail.com/api/mail/${props.id}`,
      user.token,
      { is_read: true },
      (response) => {
        if (response.status === 204) {
          return history.push(`/mail/edit/${props.id}`);
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
      <h1>This is the draft page</h1>
      <Table cls="table-border">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Message</th>
            <th>Sent to</th>
            <th>Created at</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(mailData).map((key, index) => (
            <tr
              key={index}
              onClick={(e) => editClickHandler(e, mailData[key])}
              style={{ cursor: "pointer" }}
            >
              <td>{mailData[key]["subject"]}</td>
              <td>{mailData[key]["message"].split(" ")[0]}...</td>
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
            </tr>
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

export default DraftPage;
