import React, { useState, useContext } from "react";
import UseGetData from "../../hooks/UseGetData";
import UsePutData from "../../hooks/UsePutData";
import UseDeleteData from "../../hooks/UseDeleteData";
import { UserContext } from "../../containers/contexts/UserContext";
import { Table } from "metro4-react";
import styled from "styled-components";

const RecyclePageDiv = styled.div`
  text-align: center;
  padding-left: 50px;
`;

const RecyclePage = (props) => {
  const user = useContext(UserContext)[0];
  const [errorMessage, setErrorMessage] = useState([]);

  const mailData = UseGetData(
    "http://laramail.com/api/mail-recycle",
    user.token,
    setErrorMessage
  )[1];

  const forceDeleteClickHandler = (e, id) => {
    e.stopPropagation();
    e.currentTarget.closest("tr").remove();

    UseDeleteData(
      `http://laramail.com/api/mail/force-delete/${id}`,
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
  const restoreClickHandler = (e, id) => {
    e.stopPropagation();
    e.currentTarget.closest("tr").remove();
    UsePutData(
      `http://laramail.com/api/mail/${id}`,
      user.token,
      { restore: true },
      (response) => {
        if (response.status === 204) {
          return setErrorMessage({ message: "Restore successful!" });
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
    <RecyclePageDiv>
      <h3>Deleted mails</h3>
      <Table cls="table-border table-style">
        <thead>
          <tr>
            <th>Origin</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Sender</th>
            <th>Sent to</th>
            <th>Created at</th>
            <th>Purge</th>
            <th>Restore</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(mailData).map((key, index) => (
            <tr key={index}>
              <td>
                {mailData[key]["addressee"] === user
                  ? "Inbox"
                  : mailData[key]["sent"]
                  ? "Sent"
                  : "Draft"}
              </td>
              <td>{mailData[key]["subject"]}</td>
              <td>{mailData[key]["message"].split(" ")[0]}...</td>
              <td>{mailData[key]["sender"]}</td>
              <td>{mailData[key]["addressee"]}</td>
              <td>{mailData[key]["created"]}</td>
              <td>
                <button
                  type="button"
                  onClick={(e) =>
                    forceDeleteClickHandler(e, mailData[key]["id"])
                  }
                >
                  Purge
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={(e) => restoreClickHandler(e, mailData[key]["id"])}
                >
                  Restore
                </button>
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
    </RecyclePageDiv>
  );
};

export default RecyclePage;
