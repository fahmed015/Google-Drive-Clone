import React, { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { createFile } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import { Button, Toast, ToastContainer, ProgressBar } from "react-bootstrap";
// import { StateRoot } from "../Store/Reducer";
export default function AddFilebtn(props: any) {
  const currentFolder = useSelector((state: StateRoot) => state.folderid);
  const user = useSelector((state: StateRoot) => state.user);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [progressData, setProgressData] = useState<number>(0);

  const inputRef = useRef<any>(null);

  const upload = () => {
    inputRef.current?.click();
  };

  const addFile = (file: Blob | undefined) => {
    if (file) {
      const storage = getStorage();
      const filestorage = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(filestorage, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressData(progress);
          setShowProgress(true);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          createFile(file, currentFolder, user.uid);
        }
      );
    }
  };
  const test = async () => {
    console.log("test");
    const response = await fetch(
      "https://firebasestorage.googleapis.com/v0/b/driveclone-d0e92.appspot.com/o/lg.png?alt=media&token=2d4aa513-faf6-4ec3-bba2-b4d66e051892"
    );
    const blob = await response.blob();
    console.log(blob);
  };

  return (
    <div>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast onClose={() => setShowProgress(false)} show={showProgress}>
          <Toast.Header>
            <strong className="me-auto">File Upload</strong>
          </Toast.Header>
          <Toast.Body>
            <ProgressBar
              now={progressData}
              variant={progressData === 100 ? "success" : ""}
            />
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Button variant="secondry" onClick={test}>
        cancel
      </Button>

      <input
        type="file"
        ref={inputRef}
        onClick={(event) => {
          event.currentTarget.value = "";
        }}
        onChange={(e) =>
          addFile(e.target.files ? e.target.files[0] : undefined)
        }
        style={{ display: "none" }}
      />

      <Button onClick={upload} className="DriveButton">
        <FiUpload className="icon" />
        Upload File
      </Button>
    </div>
  );
}
