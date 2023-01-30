// // import { createContext, useState, useEffect } from "react";
// // import { auth } from "../Firebase/Firebase";
// // import { onAuthStateChanged, getAuth } from "firebase/auth";
// // const userContext = createContext();

// // export function AuthContext({ children }) {
// //   const [userin, setUserin] = useState({});
// //   console.log(userin);
// //   const auth = getAuth();

// //   useEffect(() => {
// //     onAuthStateChanged(auth, (user) => {
// //       console.log(user);
// //       setUserin(user);
// //     });
// //   }, []);

// //   return <userContext.Provider value={userin}>{children}</userContext.Provider>;
// // }

// // export default userContext;
// import React from "react";
// import { useEffect } from "react";
// import { auth } from "../Firebase/Firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { connect } from "react-redux";
// import { setUser } from "../Store/Actions";
// function AuthContext(props) {
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       console.log(user);
//       props.setUser(user);
//     });
//   }, []);
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUser: (user) => dispatch(setUser(user)),
//   };
// };

// export default connect(mapDispatchToProps)(AuthContext);

// //export default AuthContext
