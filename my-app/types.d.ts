const SELECT_FOLDER = "SELECT_FOLDER";
const UPDATE_FOLDER = "UPDATE_FOLDER";
const SET_CHILDFOLDER = "SET_CHILDFOLDER";
const SET_CHILDFILE = "SET_CHILDFILE";
const SET_USER = "SET_USER";

interface ArrayMove {
  id: string;
  foldername?: string;
  parentid?: string | null;
  userid?: string;
  disablecond: boolean;
  activecond: boolean;
}

interface ChildFolder {
  id: string;
  foldername?: string;
  parentid?: string | null;
  userid?: string;
}
interface ChildFile {
  id: string;
  filename?: string;
  parentid?: string | null;
  userid?: string;
  fileurl?: string | undefined;
  size?: number;
  type?: string;
}

interface StateRoot {
  folderid: string | null;
  childfolder: ChildFolder[];
  childfile: ChildFile[];
  user: any;
}

interface PayloadSelectFolder {
  type: typeof SELECT_FOLDER;
  payload: {
    FolderId: string | null;
  };
}
interface PayloadUpdateFolder {
  type: typeof UPDATE_FOLDER;
  payload: {
    FolderId: string | null;
  };
}
interface PayloadSetChildFile {
  type: typeof SET_CHILDFILE;
  payload: {
    FolderId: string | null;
    ChildFile: ChildFile[];
  };
}
interface PayloadSetChildFolder {
  type: typeof SET_CHILDFOLDER;
  payload: {
    FolderId: string | null;
    ChildFolder: ChildFolder[];
  };
}

interface PayloadSetUser {
  type: typeof SET_USER;
  payload: {
    User: any;
  };
}

interface Payload {
  FolderId: string | null;
  ChildFolder: ChildFolder[];
  ChildFile: ChildFile[];
  User: any;
}

// interface Action {
//   type: string;
//   payload: Payload;
// }
type Action =
  | PayloadSetUser
  | PayloadSetChildFile
  | PayloadUpdateFolder
  | PayloadSetChildFolder
  | PayloadSelectFolder;
