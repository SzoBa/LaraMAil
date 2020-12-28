import "./App.css";
import { UserContextProvider } from "./containers/contexts/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import MainContainer from "./containers/MainContainer";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <MainContainer />
      </Router>
    </UserContextProvider>
  );
}

export default App;
