import logo from "./logo.svg";
import "./App.scss";
import SignupPage from "./Pages/SignupPage";
import Account from "./Pages/Account";
import Usercheck from "./Hooks/Usercheck";
import { Usercheck2 } from "./Hooks/Usercheck";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { redirect } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setUser } from "./Store/Actions";
import NavBar from "./Components/NavBar";
//import { AuthContext } from "./Context/AuthContext";
import { auth } from "./Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import HomePage from "./Pages/HomePage";
import SigninPage from "./Pages/SigninPage";
function App(props) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      props.setUser(user);
    });
  }, []);

  return (
    // <AuthContext>
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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    // </AuthContext>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
};
export default connect(null, mapDispatchToProps)(App);

// export default App;
