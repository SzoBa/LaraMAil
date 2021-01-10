import React from "react";
import styled from "styled-components";

const MainPageH3 = styled.h3`
  margin-top: 3%;
  font-size: 5rem;
  color: #d56a6a;
  text-shadow: -2px 0 #d56a6a, 0 2px #d56a6a, 2px 0 #d56a6a, 0 -2px #d56a6a;
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
