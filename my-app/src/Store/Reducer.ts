import {
  SELECT_FOLDER,
  UPDATE_FOLDER,
  SET_CHILDFOLDER,
  SET_CHILDFILE,
  SET_USER
} from './ActionTypes';

interface Action {
  type: string;
  payload: any;
}

export interface StateRoot {
  folderid: any;
  childfolder: any;
  childfile: any;
  user: any;
}

const intialstate = {
  folderid: null,
  childfolder: [],
  childfile: [],
  user: {}
};

export const userReducer = (state: StateRoot = intialstate, action: Action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload.User
      };
    }

    case SELECT_FOLDER: {
      return {
        ...state,
        folderid: action.payload.FolderId,
        childfolder: [],
        childfile: []
      };
    }
    case UPDATE_FOLDER: {
      return {
        ...state,
        folderid: action.payload.FolderId,
        childfolder: [],
        childfile: []
      };
    }
    case SET_CHILDFOLDER: {
      if (action.payload.FolderId === state.folderid) {
        state = {
          ...state,
          childfolder: action.payload.ChildFolder
        };
      }

      return state;
    }
    case SET_CHILDFILE: {
      if (action.payload.FolderId === state.folderid) {
        state = {
          ...state,
          childfile: action.payload.ChildFile
        };
      }

      return state;
    }
    default: {
      return state;
    }
  }
};
