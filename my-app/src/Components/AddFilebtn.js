import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import { storage } from "../Firebase/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiUpload } from "react-icons/fi";
//import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { UilFileUpload } from "@iconscout/react-unicons";
import ToastContainer from "react-bootstrap/ToastContainer";
import ProgressBar from "react-bootstrap/ProgressBar";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../Firebase/Firebase";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export default function AddFilebtn(props) {
  //const { currentfolder } = props;
  const currentfolder = useSelector((state) => state.folderid);
  //console.log(currentfolder);
  const [show, setShow] = useState(false);
  const [progressdata, setProgressdata] = useState(null);
  const user = useSelector((state) => state.user);
  // const user = useContext(userContext);
  const inputRef = useRef(null);

  const Upload = () => {
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
          getMetadata(filestorage)
            .then((metadata) => {
              console.log(metadata);

              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                addDoc(fileref, {
                  filename: file.name,
                  parentid: currentfolder,
                  userid: user.uid,
                  type: metadata.contentType,
                  size: metadata.size,
                  fileurl: downloadURL,
                });

                console.log("File available at", downloadURL);
              });

              // Metadata now contains the metadata for 'images/forest.jpg'
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
            });
        }
      );
    }
  };

  return (
    <div>
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
        onChange={(e) => addfile(e.target.files[0])}
        style={{ display: "none" }}
      />

      <Button onClick={Upload} className="DriveButton">
        <FiUpload className="icon" />
        {/* <UilFileUpload className="icon" /> */}
        Upload File
      </Button>
    </div>
  );
}
