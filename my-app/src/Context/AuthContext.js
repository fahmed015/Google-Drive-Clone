import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
const userContext = createContext();

export function AuthContext({ children }) {
  const [userin, setUserin] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUserin(user);
        const uid = user.uid;
        console.log(uid);
      } else {
        setUserin({});
      }
    });
  }, []);

  return <userContext.Provider value={userin}>{children}</userContext.Provider>;
}

export default userContext;
