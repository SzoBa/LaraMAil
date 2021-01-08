import React, { useState, useContext } from "react";
import UseGetData from "../../hooks/UseGetData";
import { UserContext } from "../../containers/contexts/UserContext";

const DraftPage = (props) => {
  const user = useContext(UserContext)[0];
  const [errorMessage, setErrorMessage] = useState([]);
  const mailData = UseGetData(
    "http://laramail.com/api/mail-draft",
    user.token,
    setErrorMessage
  )[1];

  return (
    <div>
      <h1>This is the draft page</h1>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Message</th>
            <th>Sent to</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(mailData).map((key, index) => (
            <tr key={index}>
              <td>{mailData[key]["subject"]}</td>
              <td>{mailData[key]["message"]}</td>
              <td>{mailData[key]["name"]}</td>
              <td>{mailData[key]["created"]}</td>
            </tr>
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

export default DraftPage;
