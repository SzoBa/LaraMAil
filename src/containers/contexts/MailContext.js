import { useState, createContext } from "react";

export const MailContext = createContext();

export const MailContextProvider = (props) => {
  const [mailInfo, setMailInfo] = useState({
    unread: 0,
  });

  return (
    <MailContext.Provider value={[mailInfo, setMailInfo]}>
      {props.children}
    </MailContext.Provider>
  );
};
