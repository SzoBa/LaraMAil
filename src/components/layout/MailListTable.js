import React from "react";

const MailListTable = (props) => {
  const mailDetails = { person: "" };
  switch (props.mailStatus) {
    case "incoming":
      mailDetails.person = "Sender";
      break;
    default:
      mailDetails.person = "Mézga Géza";
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Message</th>
          <th>{mailDetails.person}</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {props.mailData.map((data) => (
          <tr>
            <td>{data.subject}</td>
            <td>{data.created}</td>
            <td>{data.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MailListTable;
