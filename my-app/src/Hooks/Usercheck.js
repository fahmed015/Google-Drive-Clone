import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

import userContext from "../Context/AuthContext";
import { useContext } from "react";
function Usercheck() {
  const user = useContext(userContext);
  console.log(user);
  return !!user ? <Outlet /> : <Navigate to="/" />;
}
export function Usercheck2() {
  const user = useContext(userContext);
  console.log(user);

  if (!!user) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
}
export default Usercheck;
