import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../containers/contexts/UserContext";
import MDEditor from "@uiw/react-md-editor";
import useGetMultipleData from "../../hooks/UseGetMultipleData";
import styled from "styled-components";
import "../../style/EditAreas.css";

const ViewPageDiv = styled.div`
  text-align: center;
  padding-left: 50px;
`;

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
    <ViewPageDiv>
      <h3>View mail</h3>
      <div id="sender_content">
        <h5>From user: </h5>
        <div id="fromUser">{sender.name ? sender.name : <br />}</div>
      </div>
      <div id="message_content">
        <h3>Message text: </h3>
        <MDEditor.Markdown source={mailData ? mailData.message : ""} />
      </div>
      <div>
        {Object.keys(errorMessage).map((key, index) => (
          <p key={index}>{errorMessage[key]}</p>
        ))}
      </div>
    </ViewPageDiv>
  );
};

export default ViewPage;
