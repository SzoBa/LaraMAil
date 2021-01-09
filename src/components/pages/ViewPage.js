import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UseGetData from "../../hooks/UseGetData";
import { UserContext } from "../../containers/contexts/UserContext";
import MDEditor from "@uiw/react-md-editor";

const ViewPage = (props) => {
  const history = useHistory();
  const user = useContext(UserContext)[0];
  const [errorMessage, setErrorMessage] = useState([]);
  const [mailData, setMailData] = useState("");

  const data = UseGetData(
    `http://laramail.com/api/mail/${props.match.params.id}`,
    user.token,
    setErrorMessage
  )[1];

  useEffect(() => {
    setMailData(data);
  }, [data]);

  return (
    <div>
      <h1>This is the e-mail view page</h1>
      <div>
        <label>
          From user:
          <div id="fromUser">Sender</div>
        </label>
      </div>
      <div>
        <label>
          Text:
          <MDEditor.Markdown source={mailData ? mailData.message : ""} />
        </label>
      </div>
    </div>
  );
};

export default ViewPage;
