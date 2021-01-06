import { Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/layout/Navbar";
import MainPage from "../components/pages/MainPage";
import RegistrationPage from "../components/pages/RegistrationPage";
import LoginPage from "../components/pages/LoginPage";
import SideBar from "../components/layout/SideBar";
import InboxPage from "../components/pages/InboxPage";
import SentPage from "../components/pages/SentPage";
import ComposePage from "../components/pages/ComposePage";
import DraftPage from "../components/pages/DraftPage";

// background: url(${(props) => props.currentTheme.backgroundImage}) no-repeat
//   fixed;
// color: ${(props) => props.currentTheme.textColor};
// background-size: cover;
const MainBody = styled.div`
  min-height: 100%;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  box-sizing: border-box;
`;

const RouteContentContainer = styled.div`
  position: fixed;
  min-height: 100%;
  left: 150px;
`;

const MainContainer = (props) => {
  return (
    <MainBody>
      <Navbar />
      <SideBar />
      <RouteContentContainer>
        <Route exact path="/" component={MainPage} />
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/mail/inbox" component={InboxPage} />
        <Route path="/mail/sent" component={SentPage} />
        <Route path="/mail/compose" component={ComposePage} />
        <Route path="/mail/drafts" component={DraftPage} />
      </RouteContentContainer>
    </MainBody>
  );
};

export default MainContainer;
