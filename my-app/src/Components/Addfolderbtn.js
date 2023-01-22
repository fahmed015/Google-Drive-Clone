import React from "react";
import Button from "react-bootstrap/Button";
import { db } from "../Firebase/Firebase";
import Form from "react-bootstrap/Form";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { useState } from "react";
import userContext from "../Context/AuthContext";
import { useContext } from "react";
import Modal from "react-bootstrap/Modal";

export default function Addfolderbtn(props) {
  const { currentfolder } = props;
  console.log(currentfolder);
  const user = useContext(userContext);

  const [show, setShow] = useState(false);
  const [foldername, setFoldername] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addfolder = () => {
    if (foldername) {
      const folderref = collection(db, "folder");

      addDoc(folderref, {
        foldername: foldername,
        parentid: currentfolder.folderid,
        userid: user.uid,
      });
      console.log("folder created");
    }
    setFoldername("");
    setShow(false);
  };

  return (
    <div>
      <Button style={{ backgroundColor: "#7a82f2" }} onClick={handleShow}>
        Add Folder
      </Button>

      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Folder Name"
                onChange={(e) => setFoldername(e.target.value)}
                value={foldername}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addfolder}>
            add folder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
