import {
  SELECT_FOLDER,
  UPDATE_FOLDER,
  SET_CHILDFOLDER,
  SET_CHILDFILE,
  SET_USER,
} from "./ActionTypes";

// interface ChildFolder {
//   id: string;
//   foldername: string;
//   parentid: string | null;
//   userid: string;
// }
// interface ChildFile {
//   id: string;
//   filename: string;
//   parentid: string | null;
//   userid: string;
//   fileurl: string;
//   size: number;
//   type: string;
// }

// export interface StateRoot {
//   folderid: string | null;
//   childfolder: ChildFolder[] | null;
//   childfile: ChildFile[] | null;
//   user: any;
// }
// interface Payload {
//   FolderId: string | null;
//   ChildFolder: ChildFolder[] ;
//   ChildFile: ChildFile[] ;
//   User: any;
// }

// interface Action {
//   type: string;
//   payload: Payload;
// }

const intialstate = {
  folderid: null,
  childfolder: [],
  childfile: [],
  user: {},
};

export const userReducer = (state: StateRoot = intialstate, action: Action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload.User,
      };
    }

    case SELECT_FOLDER: {
      return {
        ...state,
        folderid: action.payload.FolderId,
        childfolder: [],
        childfile: [],
      };
    }
    case UPDATE_FOLDER: {
      return {
        ...state,
        folderid: action.payload.FolderId,
        childfolder: [],
        childfile: [],
      };
    }
    case SET_CHILDFOLDER: {
      if (action.payload.FolderId === state.folderid) {
        state = {
          ...state,
          childfolder: action.payload.ChildFolder,
        };
      }

      return state;
    }
    case SET_CHILDFILE: {
      if (action.payload.FolderId === state.folderid) {
        state = {
          ...state,
          childfile: action.payload.ChildFile,
        };
      }

      return state;
    }
    default: {
      return state;
    }
  }
};
