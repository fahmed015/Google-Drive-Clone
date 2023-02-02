import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import { StateRoot } from '../Store/Reducer';

function Usercheck() {
  // const user = useSelector((state) => state.user);
  const user = useSelector((state: StateRoot) => state.user);
  return !!user ? <Outlet /> : <Navigate to='/' />;
}
export function Usercheck2() {
  // const user = useSelector((state) => state.user);
  const user = useSelector((state: StateRoot) => state.user);

  if (!!user) {
    if (Object.keys(user).length === 0) {
      //loading
      return <Outlet />;
    } else {
      return <Navigate to='/' />;
    }
  } else {
    return <Outlet />;
  }
}
export default Usercheck;
