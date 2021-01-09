import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UseGetData from "../../hooks/UseGetData";
import UsePutData from "../../hooks/UsePutData";
import { UserContext } from "../../containers/contexts/UserContext";

const EditPage = (props) => {
  const history = useHistory();
  const user = useContext(UserContext)[0];
  const [errorMessage, setErrorMessage] = useState([]);
  //const [value, setValue] = useState(""); //this is the message content!!!

  const mailData = UseGetData(
    `http://laramail.com/api/mail/${props.match.params.id}`,
    user.token,
    setErrorMessage
  )[1];

  // useEffect(() => {
  //   setMailData(data.message);
  // }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailObject = {
      name: event.target.elements.address.value,
      // message: value,
    };

    UsePutData("http://laramail.com/api/login", emailObject, (response) => {
      if (response.status === 201) {
        // setErrorMessage([]);
        //TODO add message
        history.push("/mail/inbox");
      }
      Object.entries(response).forEach(([k, v]) => {
        v.forEach((value) => {
          setErrorMessage((old) => [...old, value]);
        });
      });
    });
  };

  return (
    <div>
      <h1>This is the e-mail sending page</h1>
      <form method="put" onSubmit={handleSubmit}>
        <div>
          <label>
            Send to user:
            <input type="text" name="address" />
          </label>
        </div>
        <div>
          <label>
            Text:
            <textarea type="text" name="emailText"></textarea>
          </label>
        </div>
        <button type="submit">Send email</button>
      </form>
      <div>
        {errorMessage === null
          ? ""
          : errorMessage.map((data, index) => <p key={index}>{data}</p>)}
      </div>
    </div>
  );
};

export default EditPage;
