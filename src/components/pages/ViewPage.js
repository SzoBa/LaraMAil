import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../containers/contexts/UserContext";
import MDEditor from "@uiw/react-md-editor";
import useGetMultipleData from "../../hooks/UseGetMultipleData";

const ViewPage = (props) => {
  const user = useContext(UserContext)[0];
  const [errorMessage, setErrorMessage] = useState([]);
  const [mailData, setMailData] = useState("");
  const [sender, setSenderData] = useState("");

  const data = useGetMultipleData(
    `http://laramail.com/api/mail/${props.match.params.id}`,
    `http://laramail.com/api/user/name/`,
    "id_user_from",
    user.token,
    setErrorMessage
  );

  useEffect(() => {
    setMailData(data[0]);
    setSenderData(data[1]);
  }, [data]);
  return (
    <div>
      <h1>This is the e-mail view page</h1>
      <div>
        <label>
          From user:
          <div id="fromUser">{sender.name ? sender.name : <br />}</div>
        </label>
      </div>
      <div>
        <label>
          Text:
          <MDEditor.Markdown source={mailData ? mailData.message : ""} />
        </label>
      </div>
      <div>
        {Object.keys(errorMessage).map((key, index) => (
          <p key={index}>{errorMessage[key]}</p>
        ))}
      </div>
    </div>
  );
};

export default ViewPage;
