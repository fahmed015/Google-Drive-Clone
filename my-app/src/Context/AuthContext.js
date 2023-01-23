import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
const userContext = createContext();

export function AuthContext({ children }) {
  const [userin, setUserin] = useState({});
  console.log(userin);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUserin(user);
    });
  }, []);

  return <userContext.Provider value={userin}>{children}</userContext.Provider>;
}

export default userContext;
