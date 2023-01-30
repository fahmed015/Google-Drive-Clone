import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

// import userContext from "../Context/AuthContext";
// import { useContext } from "react";
import { useSelector } from "react-redux";

function Usercheck() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return !!user ? <Outlet /> : <Navigate to="/" />;
}
export function Usercheck2() {
  const user = useSelector((state) => state.user);
  console.log(user);

  if (!!user) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
}
export default Usercheck;
