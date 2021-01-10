import "./App.css";
import { UserContextProvider } from "./containers/contexts/UserContext";
import { MailContextProvider } from "./containers/contexts/MailContext";
import { BrowserRouter as Router } from "react-router-dom";
import MainContainer from "./containers/MainContainer";

function App() {
  return (
    <UserContextProvider>
      <MailContextProvider>
        <Router>
          <MainContainer />
        </Router>
      </MailContextProvider>
    </UserContextProvider>
  );
}

export default App;
