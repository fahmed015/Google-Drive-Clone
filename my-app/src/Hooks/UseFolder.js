import { useContext, useReducer, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import userContext from "../Context/AuthContext";
const SELECT_FOLDER = "SELECT_FOLDER";
const UPDATE_FOLDER = "UPDATE_FOLDER";
const SET_CHILDFOLDER = "SET_CHILDFOLDER";
const SET_CHILDFILE = "SET_CHILDFILE";

function reducer(state, action) {
  switch (action.type) {
    case SELECT_FOLDER: {
      return {
        folderid: action.payload.folderid,

        childfolder: [],
        childfile: [],
      };
    }
    case UPDATE_FOLDER: {
      return {
        ...state,
        folderid: action.payload.folderid,
      };
    }
    case SET_CHILDFOLDER: {
      return {
        ...state,
        childfolder: action.payload.childfolder,
      };
    }
    case SET_CHILDFILE: {
      return {
        ...state,
        childfile: action.payload.childfile,
      };
    }
    default: {
      return state;
    }
  }
}

function UseFolder(folderid = null, folder = null) {
  console.log(folderid);
  const user = useContext(userContext);
  console.log(user);
  const [state, dispatch] = useReducer(reducer, {
    folderid,
    childfolder: [],
    childfile: [],
  });

  useEffect(() => {
    dispatch({
      type: UPDATE_FOLDER,
      payload: {
        folderid: folderid,
      },
    });
  }, [folderid]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      const q = query(
        collection(db, "folder"),
        where("parentid", "==", folderid),
        where("userid", "==", user.uid)
      );
      console.log(q);
      onSnapshot(q, (querySnapshot) => {
        const childarr = [];
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };

          childarr.push(data);

          console.log(doc.data());
        });

        dispatch({
          type: SET_CHILDFOLDER,
          payload: {
            childfolder: childarr,
          },
        });
      });
    }
  }, [folderid, user]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      const q = query(
        collection(db, "file"),
        where("parentid", "==", folderid),
        where("userid", "==", user.uid)
      );
      console.log(q);
      onSnapshot(q, (querySnapshot) => {
        const childarr = [];
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };

          childarr.push(data);

          console.log(doc.data());
        });

        dispatch({
          type: SET_CHILDFILE,
          payload: {
            childfile: childarr,
          },
        });
      });
    }
  }, [folderid, user]);

  return state;
}
export default UseFolder;
