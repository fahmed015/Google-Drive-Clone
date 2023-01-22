import logo from "./logo.svg";
import "./App.css";
import SignupPage from "./Pages/SignupPage";
import Account from "./Pages/Account";
import Usercheck from "./Hooks/Usercheck";
import { Usercheck2 } from "./Hooks/Usercheck";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { AuthContext } from "./Context/AuthContext";
import HomePage from "./Pages/HomePage";
import SigninPage from "./Pages/SigninPage";
function App() {
  return (
    <AuthContext>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route exact path="/signup" element={<SignupPage />} />

          <Route element={<Usercheck2 />}>
            <Route exact path="/signin" element={<SigninPage />} />
          </Route>

          <Route element={<Usercheck />}>
            <Route exact path="/Account/:folderId" element={<Account />} />
            <Route exact path="/Account" element={<Account />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext>
  );
}

export default App;
