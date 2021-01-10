import React from "react";
import styled from "styled-components";

const MainPageH3 = styled.h3`
  margin-top: 3%;
  font-size: 5rem;
  color: red;
  text-shadow: -2px 0 red, 0 2px red, 2px 0 red, 0 -2px red;
`;

const MainPageDiv = styled.div`
  text-align: center;
  margin: 10% auto;
`;

const MainPage = (props) => {
  return (
    <MainPageDiv>
      <MainPageH3>Welcome to LaraMail!</MainPageH3>
    </MainPageDiv>
  );
};

export default MainPage;
