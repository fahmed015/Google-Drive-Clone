import {
  SELECT_FOLDER,
  SET_USER,
  UPDATE_FOLDER,
  SET_CHILDFOLDER,
  SET_CHILDFILE,
} from "./ActionTypes";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      User: user,
    },
  };
};

export const selectFolder = (folderid) => {
  return {
    type: SELECT_FOLDER,
    payload: {
      FolderId: folderid,
    },
  };
};
export const updateFolder = (folderid) => {
  return {
    type: UPDATE_FOLDER,
    payload: {
      FolderId: folderid,
    },
  };
};
export const setChildFolder = (folderid, childfolder) => {
  return {
    type: SET_CHILDFOLDER,
    payload: {
      FolderId: folderid,
      ChildFolder: childfolder,
    },
  };
};
export const setChildFile = (childfile) => {
  return {
    type: SET_CHILDFILE,
    payload: {
      ChildFile: childfile,
    },
  };
};
