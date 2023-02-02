import './App.scss';
import SignupPage from './Pages/SignupPage';
import Account from './Pages/Account';
import Usercheck, { Usercheck2 } from './Hooks/UserCheck';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUser } from './Store/Actions';
import { auth } from './Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import HomePage from './Pages/HomePage';
import SigninPage from './Pages/SigninPage';
import React from 'react';

type Props = {
  setUser: (user: any) => void;
};

function App(props: Props) {
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      props.setUser(user);
    });
  }, [props]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route element={<Usercheck2 />}>
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Route>

        <Route element={<Usercheck />}>
          <Route path='/Account/:folderIdParams' element={<Account />} />
          <Route path='/Account' element={<Account />} />
        </Route>

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}
const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: { User: any } }) => any) => {
  return {
    setUser: (user: any) => dispatch(setUser(user))
  };
};
export default connect(null, mapDispatchToProps)(App);

// export default App;
