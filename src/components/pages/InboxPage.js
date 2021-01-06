import React from "react";
import UseGetData from "../../hooks/UseGetData";

const InboxPage = (props) => {
  const [isLoading, mailData] = UseGetData("http://laramail.com/api/mail");
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
          {mailData.map((data, index) => (
            <tr key={index}>
              <td>{data.subject}</td>
              <td>{data.message}</td>
              <td>{data.id_user_from}</td>
              <td>{data.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InboxPage;
