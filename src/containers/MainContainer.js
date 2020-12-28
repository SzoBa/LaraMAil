import { Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/layout/Navbar";
import MainPage from "../components/pages/MainPage";
import RegistrationPage from "../components/pages/RegistrationPage";

// background: url(${(props) => props.currentTheme.backgroundImage}) no-repeat
//   fixed;
// color: ${(props) => props.currentTheme.textColor};
// background-size: cover;
export const MainBody = styled.div`
  min-height: 100%;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  box-sizing: border-box;
`;

const MainContainer = (props) => {
  return (
    <MainBody>
      <Navbar />
      <Route exact path="/" component={MainPage} />
      <Route path="/registration" component={RegistrationPage} />
    </MainBody>
  );
};

export default MainContainer;
