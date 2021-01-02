import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  width: 150px;
  min-height: 100%;
  border-radius: 0 20px 20px 0;
  border: 1px solid darkgrey;
  padding: 10px 0 0 10px;
`;

const SidebarLink = styled(Link)``;

const SideBar = (props) => {
  return (
    <SidebarContainer>
      <SidebarLink to="/mail/inbox">Incoming</SidebarLink>
      <SidebarLink to="/mail/sent">Sent</SidebarLink>
      <SidebarLink to="/mail/compose">Write mail</SidebarLink>
    </SidebarContainer>
  );
};

export default SideBar;
