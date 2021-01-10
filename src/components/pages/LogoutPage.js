import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UsePostData from "../../hooks/UsePostData";
import { UserContext } from "../../containers/contexts/UserContext";
import { MailContext } from "../../containers/contexts/MailContext";

const LogoutPage = (props) => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const setMailInfo = useContext(MailContext)[1];
  const history = useHistory();

  useEffect(() => {
    if (currentUser.token) {
      UsePostData(
        "http://laramail.com/api/logout",
        currentUser.token,
        {},
        (response) => {
          if (response.status === 204) {
            setMailInfo({ unread: 0 });
            setCurrentUser({
              username: "",
              token: "",
            });
          }
          return history.goBack();
        }
      );
    }
  }, [currentUser.token, history, setCurrentUser, setMailInfo]);

  return "";
};

export default LogoutPage;
