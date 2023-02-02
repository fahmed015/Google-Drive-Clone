import {
  SELECT_FOLDER,
  SET_USER,
  UPDATE_FOLDER,
  SET_CHILDFOLDER,
  SET_CHILDFILE
} from './ActionTypes';

export const setUser = (user: any) => {
  return {
    type: SET_USER,
    payload: {
      User: user
    }
  };
};

export const selectFolder = (folderid: any) => {
  return {
    type: SELECT_FOLDER,
    payload: {
      FolderId: folderid
    }
  };
};
export const updateFolder = (folderid: any) => {
  return {
    type: UPDATE_FOLDER,
    payload: {
      FolderId: folderid
    }
  };
};
export const setChildFolder = (folderid: any, childfolder: any) => {
  return {
    type: SET_CHILDFOLDER,
    payload: {
      FolderId: folderid,
      ChildFolder: childfolder
    }
  };
};
export const setChildFile = (folderid: any, childfile: any) => {
  return {
    type: SET_CHILDFILE,
    payload: {
      FolderId: folderid,
      ChildFile: childfile
    }
  };
};
