import { Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/layout/Navbar";
import MainPage from "../components/pages/MainPage";
import RegistrationPage from "../components/pages/RegistrationPage";
import LoginPage from "../components/pages/LoginPage";
import LogoutPage from "../components/pages/LogoutPage";
import SideBar from "../components/layout/SideBar";
import InboxPage from "../components/pages/InboxPage";
import SentPage from "../components/pages/SentPage";
import ComposePage from "../components/pages/ComposePage";
import DraftPage from "../components/pages/DraftPage";
import EditPage from "../components/pages/EditPage";
import ViewPage from "../components/pages/ViewPage";
import RecyclePage from "../components/pages/RecyclePage";
import background1 from "../images/background1.png";

const MainBody = styled.div`
  min-height: 100%;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  box-sizing: border-box;
  &:before {
    content: "";
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    z-index: -1;
    background: url(${background1}) no-repeat;
    background-size: cover;
    opacity: 0.3;
  }
`;

const RouteContentContainer = styled.div`
  min-height: 100%;
  width: 100%;
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
        <Route path="/logout" component={LogoutPage} />

        <Route path="/mail/inbox" component={InboxPage} />
        <Route path="/mail/sent" component={SentPage} />
        <Route path="/mail/compose" component={ComposePage} />
        <Route path="/mail/drafts" component={DraftPage} />
        <Route path="/mail/recycle-bin" component={RecyclePage} />

        <Route path="/mail/view/:id" component={ViewPage} />
        <Route path="/mail/edit/:id" component={EditPage} />
      </RouteContentContainer>
    </MainBody>
  );
};

export default MainContainer;
