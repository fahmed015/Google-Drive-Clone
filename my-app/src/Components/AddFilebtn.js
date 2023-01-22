import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import { storage } from "../Firebase/Firebase";
import ToastContainer from "react-bootstrap/ToastContainer";
import ProgressBar from "react-bootstrap/ProgressBar";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../Firebase/Firebase";
import Form from "react-bootstrap/Form";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import userContext from "../Context/AuthContext";
import { useContext } from "react";
import Modal from "react-bootstrap/Modal";

export default function AddFilebtn(props) {
  const { currentfolder } = props;
  //console.log(currentfolder);
  const [show, setShow] = useState(false);
  const [progressdata, setProgressdata] = useState(null);
  const user = useContext(userContext);
  const inputRef = useRef(null);

  const Upload = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click();
  };

  const addfile = (file) => {
    console.log(file);
    const fileref = collection(db, "file");
    if (!!file) {
      // Create a root reference
      const storage = getStorage();
      const filestorage = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(filestorage, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressdata(progress);
          setShow(true);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(fileref, {
              filename: file.name,
              parentid: currentfolder.folderid,
              userid: user.uid,
              fileurl: downloadURL,
            });

            console.log("File available at", downloadURL);
          });
        }
      );

      // const uploadTask = uploadBytes(filestorage, file).then((snapshot) => {
      //   getDownloadURL(ref(storage, file.name)).then((url) => {
      //     console.log(url);

      //     addDoc(fileref, {
      //       filename: file.name,
      //       parentid: currentfolder.folderid,
      //       userid: user.uid,
      //       fileurl: url,
      //     });
      //   });

      //   console.log("Uploaded a blob or file!");
      // });
    }
  };

  return (
    <div>
      {/* <input type="file"></input>; */}
      <ToastContainer className="p-3" position="bottom-end">
        <Toast onClose={() => setShow(false)} show={show}>
          <Toast.Header>
            <strong className="me-auto">File upload</strong>
          </Toast.Header>
          <Toast.Body>
            <ProgressBar
              now={progressdata}
              variant={progressdata === 100 ? "success" : ""}
            />
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <input
        type="file"
        ref={inputRef}
        // onChange={handleFileChange}
        onChange={(e) => addfile(e.target.files[0])}
        style={{ display: "none" }}
      />

      <Button
        onClick={Upload}
        style={{ backgroundColor: "#7a82f2", marginRight: "0" }}
      >
        Upload file
      </Button>
    </div>
  );
}
