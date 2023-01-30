import {
  SELECT_FOLDER,
  UPDATE_FOLDER,
  SET_CHILDFOLDER,
  SET_CHILDFILE,
  SET_USER,
} from "./ActionTypes";

let intialstate = {
  folderid: null,
  childfolder: [],
  childfile: [],
  user: {},
};

export const userReducer = (state = intialstate, action) => {
  switch (action.type) {
    case SET_USER: {
      console.log("selectt", action.payload.User);
      return {
        ...state,
        user: action.payload.User,
      };
    }

    case SELECT_FOLDER: {
      console.log("selectt", action.payload.FolderId);
      return {
        ...state,
        folderid: action.payload.FolderId,

        childfolder: [],
        childfile: [],
      };
    }
    case UPDATE_FOLDER: {
      console.log(action.payload.FolderId);
      return {
        ...state,
        folderid: action.payload.FolderId,
        childfolder: [],
        childfile: [],
      };
    }
    case SET_CHILDFOLDER: {
      console.log(action.payload.FolderId);
      console.log(state.folderid);

      if (action.payload.FolderId === state.folderid) {
        state = {
          ...state,
          childfolder: action.payload.ChildFolder,
        };
      }

      return state;
    }
    case SET_CHILDFILE: {
      return {
        ...state,
        childfile: action.payload.ChildFile,
      };
    }
    default: {
      return state;
    }
  }
};
