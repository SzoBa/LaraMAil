import React, { useState, useContext } from "react";
import UseGetData from "../../hooks/UseGetData";
import { UserContext } from "../../containers/contexts/UserContext";
import UseDeleteData from "../../hooks/UseDeleteData";
import { Table, Button } from "metro4-react";

const SentPage = (props) => {
  const user = useContext(UserContext)[0];
  const [errorMessage, setErrorMessage] = useState([]);
  const mailData = UseGetData(
    "http://laramail.com/api/mail-sent",
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
  return (
    <div>
      <h1>This is the sent page</h1>
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
            <tr key={index}>
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

export default SentPage;
