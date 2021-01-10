import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "metro4-react";
import { MailContext } from "../../containers/contexts/MailContext";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 5px;import { UserContext } from "../../containers/contexts/UserContext";
`;

const SidebarLink = styled(Link)``;

const SideBar = (props) => {
  const mailInfo = useContext(MailContext)[0];

  return (
    <SidebarContainer>
      <SidebarLink to="/mail/inbox" title="Inbox">
        <Button
          icon="envelop"
          badge={mailInfo.unread === 0 ? null : mailInfo.unread}
          clsBadge={"alert"}
        />
      </SidebarLink>
      <SidebarLink to="/mail/sent" title="Sent">
        <Button icon="arrow-right" />
      </SidebarLink>
      <SidebarLink to="/mail/compose" title="Write">
        <Button icon="pencil" />
      </SidebarLink>
      <SidebarLink to="/mail/drafts" title="Drafts">
        <Button icon="drafts" />
      </SidebarLink>
      <SidebarLink to="/mail/recycle-bin" title="Recycle">
        <Button icon="bin" />
      </SidebarLink>
    </SidebarContainer>
  );
};

export default SideBar;
