import React from "react";
import UseGetData from "../../hooks/UseGetData";

const SentPage = (props) => {
  const [isLoading, mailData] = UseGetData("http://laramail.com/api/mail");
  return (
    <div>
      <h1>This is the sent page</h1>
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
          {mailData.map((data, index) => (
            <tr key={index}>
              <td>{data.subject}</td>
              <td>{data.message}</td>
              <td>{data.id_user_to}</td>
              <td>{data.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SentPage;
