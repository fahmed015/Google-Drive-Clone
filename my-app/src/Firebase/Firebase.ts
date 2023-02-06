import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from "firebase/auth";

import {
  addDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  deleteObject,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYvO5QoTfy_Eao6fqKmZxKKj3vxC7M9to",
  authDomain: "driveclone-d0e92.firebaseapp.com",
  projectId: "driveclone-d0e92",
  storageBucket: "driveclone-d0e92.appspot.com",
  messagingSenderId: "226494175922",
  appId: "1:226494175922:web:68063a127d5696c11a87ab",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export function mapAuthCodeToMessage(authCode: string) {
  switch (authCode) {
    case "auth/invalid-password":
      return "Password provided is not corrected";

    case "auth/invalid-email":
      return "Email provided is invalid";

    case "auth/user-not-found":
      return "This user is not found";

    case "auth/missing-email":
      return "Please enter email";
    // Many more authCode mapping here...

    default:
      return "error";
  }
}

export async function signUp(email: string, password: string, name: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });

    await signOut(auth);
  } catch (error: any) {
    // if (error instanceof Error) {
    const errorCode = error.code;
    const errordisplay = mapAuthCodeToMessage(errorCode);
    return errordisplay;
    // }
  }
}

export async function signIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    await setPersistence(auth, browserLocalPersistence);
  } catch (error: any) {
    // if (error instanceof Error) {
    const errorCode = error.code;
    const errordisplay = mapAuthCodeToMessage(errorCode);
    return errordisplay;
    //}
  }
}

export async function logOut() {
  await signOut(auth);
}

export async function deleteFile(id: string, name: string | undefined) {
  await deleteDoc(doc(db, "file", id));
  const storage = getStorage();
  const deleteRef = ref(storage, name);
  await deleteObject(deleteRef);
}

export async function deleteCurrentFolder(id: string) {
  await deleteDoc(doc(db, "folder", id));
  const q = query(collection(db, "file"), where("parentid", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    deleteFile(doc.id, doc.data().filename);
  });
}

export async function deleteFolder(id: string) {
  //delete current folder
  await deleteCurrentFolder(id);
  // serach for all child folders of current folder to delete
  const q = query(collection(db, "folder"), where("parentid", "==", id));
  const querySnapshot = await getDocs(q);
  //no child folder for this current folder then stop
  if (querySnapshot.size === 0) {
    return;
  } else {
    //recurrsion on the child folders to delete them
    querySnapshot.forEach((doc) => {
      deleteFolder(doc.id);
    });
  }
}

export async function createFolder(
  folderName: string,
  currentFolder: string | null,
  userId: string
) {
  const folderRef = collection(db, "folder");
  await addDoc(folderRef, {
    foldername: folderName,
    parentid: currentFolder,
    userid: userId,
  });
}

export async function createFile(
  file: Blob | undefined,
  currentFolder: string | null,
  userId: string
) {
  const fileref = collection(db, "file");
  const filestorage = ref(storage, file?.name);
  const metadata = await getMetadata(filestorage);
  const downloadURL = await getDownloadURL(filestorage);
  await addDoc(fileref, {
    filename: file?.name,
    parentid: currentFolder,
    userid: userId,
    type: metadata.contentType,
    size: metadata.size,
    fileurl: downloadURL,
  });
}

export function getFoldersOrFilesQuery(
  type: string,
  folderId: string | null,
  userId: string
) {
  const q = query(
    collection(db, type),
    where("parentid", "==", folderId),
    where("userid", "==", userId)
  );
  return q;
}

export async function getFoldersForMoveModal(
  folderId: string | null,
  userId: string,
  moveItem: string
) {
  const q = getFoldersOrFilesQuery("folder", folderId, userId);
  const arr: ArrayMove[] = [];
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    let disable = false;
    if (doc.id === moveItem) {
      disable = true;
    }
    const data = {
      id: doc.id,
      disablecond: disable,
      activecond: false,
      ...doc.data(),
    };

    arr.push(data);
  });

  return arr;
}

export async function updateFolderOrFile(
  type: string,
  folderId: string | null,
  moveItem: string
) {
  const ref = doc(db, type, moveItem);
  await updateDoc(ref, {
    parentid: folderId,
  });
}

export { auth, db, storage };
