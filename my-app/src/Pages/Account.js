import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Addfolderbtn from "../Components/Addfolderbtn";
import AddFilebtn from "../Components/AddFilebtn";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { db } from "../Firebase/Firebase";
import NavBar from "../Components/NavBar.js";
import Col from "react-bootstrap/Col";
import { FaFolder } from "react-icons/fa";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { AiFillFile } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import {
  selectFolder,
  updateFolder,
  setChildFile,
  setChildFolder,
} from "../Store/Actions";
import { getStorage, ref, deleteObject, getBlob } from "firebase/storage";
import DropdownButton from "react-bootstrap/DropdownButton";
import { doc, deleteDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const Account = (props) => {
  const navigate = useNavigate();

  const { folderId } = useParams();
  console.log(folderId);
  const foldercurrent = props.Folderid;
  console.log(foldercurrent);

  const [show, setShow] = useState(false);
  const [moveitem, setMoveitem] = useState(null);
  const [moveitemtype, setMoveitemtype] = useState(null);
  const [select, setSelect] = useState(null);
  const [history, setHistory] = useState([]);
  const [dis, setDis] = useState(false);

  const [arrfolder, setArrfolder] = useState([]);
  const handleClose = () => {
    setHistory([]);
    setShow(false);
  };
  useEffect(() => {
    if (!!folderId === false) {
      props.selectFolder(null);
    } else {
      props.selectFolder(folderId);
    }
  }, [folderId]);

  function FileItem({ name }) {
    console.log(name);
    if (name === "application/pdf") {
      return <BsFileEarmarkPdf className="icon2" />;
    } else {
      if (name === "image/jpeg") {
        console.log("nmjmjmm");
        return <BsImage className="icon2" />;
      } else {
        return <AiFillFile className="icon2" />;
      }
    }
  }

  useEffect(() => {
    if (Object.keys(props.User).length !== 0) {
      console.log(props.Folderid);
      console.log(props.Folderid);
      console.log(props.Folderid);
      const q = query(
        collection(db, "folder"),
        where("parentid", "==", props.Folderid),
        where("userid", "==", props.User.uid)
      );
      console.log(q);
      onSnapshot(q, (querySnapshot) => {
        const childarr = [];
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };

          childarr.push(data);
          console.log(childarr);
          console.log(doc.data());
        });

        props.setChildFolder(props.Folderid, childarr);
      });
    }
  }, [props.Folderid, props.User]);

  useEffect(() => {
    if (Object.keys(props.User).length !== 0) {
      const q = query(
        collection(db, "file"),
        where("parentid", "==", props.Folderid),
        where("userid", "==", props.User.uid)
      );

      onSnapshot(q, (querySnapshot) => {
        const childarr = [];
        querySnapshot.forEach((doc) => {
          console.log(doc);
          const data = { id: doc.id, ...doc.data() };

          childarr.push(data);
          console.log(childarr);
          console.log(doc.data());
        });
        props.setChildFile(childarr);
      });
    }
  }, [props.Folderid, props.User]);

  const Gotofolder = (folderid) => {
    console.log(folderid);
    navigate(`/Account/${folderid}`);
  };

  const Move = () => {
    var ref;
    if (moveitemtype === "folder") {
      ref = doc(db, "folder", moveitem);
    } else {
      ref = doc(db, "file", moveitem);
    }

    // Set the "capital" field of the city 'DC'
    updateDoc(ref, {
      parentid: select,
    })
      .then(() => {
        console.log("Document successfully updated!");
        setShow(false);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  const handleShow = (current, type) => {
    setMoveitem(current);
    setHistory([]);
    setMoveitemtype(type);
    showfolders(null, current, false);

    setShow(true);
  };

  const selectfromlist = (id) => {
    setArrfolder(
      arrfolder.map((folder) => {
        if (folder.id === id) {
          setSelect(id);
          return { ...folder, activecond: true };
        } else {
          return { ...folder, activecond: false };
        }
      })
    );
  };

  const showfolders = (folderid, current, back) => {
    console.log(folderid);
    console.log(current);
    if (back === true) {
      console.log(history);
      history.pop();
      setHistory(history);
      console.log(history);
      folderid = history.splice(-1)[0];
      setDis(false);
      if (folderid === null) {
        console.log("anaa fel rooott");
        setHistory([null]);
        setDis(true);
      }
      console.log(folderid);
    } else {
      const newdata = [...history, folderid];
      console.log(newdata);
      setHistory(newdata);
      setDis(false);
    }

    const q = query(
      collection(db, "folder"),
      where("parentid", "==", folderid),
      where("userid", "==", props.User.uid)
    );
    const arr = [];

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          var disable = false;
          if (doc.id === current) {
            disable = true;
          }
          const data = {
            id: doc.id,
            disablecond: disable,
            activecond: false,
            ...doc.data(),
          };
          arr.push(data);
          console.log(arr);
        });

        setArrfolder(arr);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const Viewfile = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const deletefile = (id, name) => {
    deleteDoc(doc(db, "file", id))
      .then(() => {
        console.log("file in firebase deleted with id", id);

        const storage = getStorage();
        const deleteRef = ref(storage, name);

        deleteObject(deleteRef)
          .then(() => {
            console.log("file in storage deleted!");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const deletefilesinfolder = (id) => {
    const q2 = query(collection(db, "file"), where("parentid", "==", id));

    getDocs(q2)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deletefile(doc.id, doc.data().filename);
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const Deleterecurrsion = (id) => {
    deleteDoc(doc(db, "folder", id))
      .then(() => {
        deletefilesinfolder(id);
        const qu = query(collection(db, "folder"), where("parentid", "==", id));

        getDocs(qu)
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              // console.log("eshtaa ha3mel delte lel folder with id");
              // console.log(id);
              deleteDoc(doc(db, "folder", id))
                .then(() => {
                  console.log("Folder deleted with id", id);
                  deletefilesinfolder(id);

                  return;
                })
                .catch((error) => {
                  console.error("Error removing document: ", error);
                });
            }

            querySnapshot.forEach((doc) => {
              Deleterecurrsion(doc.id);
            });
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const deletefolder = (id) => {
    Deleterecurrsion(id);
  };

  const downloadfile = async (url, name) => {
    // const img = document.getElementById("myimg");
    // img.setAttribute("src", url);

    // const a = document.createElement("a");
    // a.href = url;
    // a.download = name;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);

    console.log(url);

    // let blob = await fetch(url, {
    //   method: "get",
    //   mode: "no-cors",
    //   referrerPolicy: "no-referrer",
    // });
    // console.log(blob);

    // const storage = getStorage();
    // const storageRef = ref(storage, "IMG_3273.PNG");
    // const blobb = await getBlob(storageRef);
    // console.log(blobb);
    // const urlo = URL.createObjectURL(blobb);

    // fetch(url, {
    //   method: "get",
    //   mode: "no-cors",
    //   referrerPolicy: "no-referrer",
    // })
    //   .then((res) => res.blob())
    //   .then((res) => {
    //     console.log(res);
    //     const x = URL.createObjectURL(res);
    //     console.log(x);
    //     const a = document.createElement("a");
    //     a.href = x;
    //     a.download = name;
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //     // URL.revokeObjectURL(x);
    //   });

    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
      console.log(blob);
    };
    xhr.open("GET", url);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT"
    );
    xhr.setRequestHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    xhr.send();
  };

  return (
    <div className="App">
      <NavBar />

      <Container className="Homecontainer">
        <Row className="Homerow" style={{ height: "90%" }}>
          <div className="carddrive">
            <Row className="mt-5">
              <Col>
                <h1 className="  fw-bold  " style={{ color: "black" }}>
                  My Cloud
                </h1>
              </Col>
              <Col md="auto">
                <Addfolderbtn> </Addfolderbtn>
              </Col>
              <Col md="auto">
                <AddFilebtn> </AddFilebtn>
              </Col>
            </Row>

            <Row
              style={{ alignItems: "center", justifyContent: "center" }}
              className="px-3 mt-3"
            >
              <Table borderless hover>
                <thead>
                  <tr>
                    <th> Name</th>

                    <th>Size</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {props.Childfolder.map((childFolder) => {
                    return (
                      <tr
                        key={childFolder.id}
                        onClick={() => Gotofolder(childFolder.id)}
                        // onClick={Gotofolder.bind(this, childFolder.id)}
                      >
                        <td>
                          <FaFolder className="icon2" />
                          {childFolder.foldername}
                        </td>
                        <td> </td>

                        <td>
                          <DropdownButton
                            title="..."
                            onClick={(e) => e.stopPropagation()}
                            // id={`dropdown-button-drop-${childFolder.id}`}
                          >
                            <Dropdown.Item
                              onClick={() => deletefolder(childFolder.id)}
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleShow(childFolder.id)}
                            >
                              Move
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    );
                  })}

                  {props.Childfile.map((childFile) => {
                    return (
                      <tr
                        key={childFile.id}
                        onClick={() => Viewfile(childFile.fileurl)}
                      >
                        <td>
                          <FileItem name={childFile.type} />

                          {childFile.filename}
                        </td>

                        <td> {childFile.size}</td>
                        <td>
                          <DropdownButton
                            // id="dropdown-basic-button"
                            title="..."
                            onClick={(e) => e.stopPropagation()}

                            // className="test"
                          >
                            <Dropdown.Item
                              onClick={() =>
                                deletefile(childFile.id, childFile.filename)
                              }
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleShow(childFile.id)}
                            >
                              Move
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </div>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
          <Button
            disabled={dis}
            onClick={() => showfolders(null, moveitem, true)}
          >
            ←
          </Button>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {arrfolder.map((folder) => {
              return (
                <ListGroup.Item
                  className="d-flex justify-content-between align-items-start"
                  key={folder.id}
                  disabled={folder.disablecond}
                  action
                  active={folder.activecond}
                  onClick={() => selectfromlist(folder.id)}
                >
                  <div> {folder.foldername}</div>
                  <Button
                    variant="light"
                    disabled={folder.disablecond}
                    onClick={() => showfolders(folder.id, moveitem, false)}
                  >
                    →{" "}
                  </Button>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="light" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="light" onClick={Move}>
            Move Here
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    User: state.user,
    Folderid: state.folderid,
    Childfolder: state.childfolder,
    Childfile: state.childfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectFolder: (folderid) => dispatch(selectFolder(folderid)),
    updateFolder: (folderid) => dispatch(updateFolder(folderid)),
    setChildFolder: (arr, id) => dispatch(setChildFolder(arr, id)),
    setChildFile: (arr) => dispatch(setChildFile(arr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

//export default Account;
