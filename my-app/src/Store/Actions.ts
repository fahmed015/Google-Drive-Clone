import {
  SELECT_FOLDER,
  SET_USER,
  UPDATE_FOLDER,
  SET_CHILDFOLDER,
  SET_CHILDFILE,
} from "./ActionTypes";

export const setUser = (user: any) => {
  return {
    type: SET_USER,
    payload: {
      User: user,
    },
  };
};

export const selectFolder = (folderid: string | null) => {
  return {
    type: SELECT_FOLDER,
    payload: {
      FolderId: folderid,
    },
  };
};
export const updateFolder = (folderid: string | null) => {
  return {
    type: UPDATE_FOLDER,
    payload: {
      FolderId: folderid,
    },
  };
};
export const setChildFolder = (
  folderid: string | null,
  childfolder: ChildFolder[]
) => {
  return {
    type: SET_CHILDFOLDER,
    payload: {
      FolderId: folderid,
      ChildFolder: childfolder,
    },
  };
};
export const setChildFile = (
  folderid: string | null,
  childfile: ChildFile[]
) => {
  return {
    type: SET_CHILDFILE,
    payload: {
      FolderId: folderid,
      ChildFile: childfile,
    },
  };
};
