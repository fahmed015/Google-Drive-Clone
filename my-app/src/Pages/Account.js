import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
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

import { db } from "../Firebase/Firebase";
import NavBar from "../Components/NavBar.js";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { collection, query, where, getDocs } from "firebase/firestore";

import { getStorage, ref, deleteObject, getBlob } from "firebase/storage";
import DropdownButton from "react-bootstrap/DropdownButton";
import { doc, deleteDoc } from "firebase/firestore";

import userContext from "../Context/AuthContext";
import { useContext } from "react";
import UseFolder from "../Hooks/CurrentFolder";
import { useParams } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const user = useContext(userContext);
  const { folderId } = useParams();
  console.log(folderId);

  const state = UseFolder(folderId);

  const childfolders = state.childfolder;
  const childfiles = state.childfile;

  console.log(state);

  const test = (folderid) => {
    navigate(`/Account/${folderid}`);
  };

  const deletefile = (id, name) => {
    deleteDoc(doc(db, "file", id))
      .then(() => {
        console.log("Document successfully deleted!");
        const storage = getStorage();
        const deleteRef = ref(storage, name);

        deleteObject(deleteRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const deletefolder = (id) => {
    deleteDoc(doc(db, "folder", id))
      .then(() => {
        // const q = query(collection(db, "file"), where("parentid", "==", id));
        // console.log(q);
        // getDocs(q)
        //   .then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //       console.log(doc.id, " => ", doc.data());
        //       deletefile(doc.id, doc.data().filename);
        //     });
        //   })
        //   .catch((error) => {
        //     console.error("Error removing document: ", error);
        //   });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
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
                <Addfolderbtn currentfolder={state}> </Addfolderbtn>
              </Col>
              <Col md="auto">
                <AddFilebtn currentfolder={state}> </AddFilebtn>
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
                    <th>Storage</th>
                    <th>date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {childfolders.map((childFolder) => {
                    return (
                      <tr key={childFolder.id}>
                        <td>
                          <Link
                            style={{ color: "black", textDecoration: "none" }}
                            to={{
                              pathname: `/Account/${childFolder.id}`,
                            }}
                          >
                            {childFolder.foldername}
                          </Link>{" "}
                        </td>
                        <td> </td>
                        <td> </td>
                        <td>
                          {/* <Button
                            onClick={deletefolder.bind(this, childFolder.id)}
                          >
                            delete
                          </Button> */}

                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              ...
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={deletefolder.bind(
                                  this,
                                  childFolder.id
                                )}
                              >
                                Delete
                              </Dropdown.Item>
                              <Dropdown.Item>Move</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}

                  {childfiles.map((childFile) => {
                    return (
                      <tr key={childFile.id}>
                        <td>
                          <a
                            href={childFile.fileurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            {childFile.filename}
                          </a>
                        </td>
                        <td> </td>
                        <td>
                          {/* <Dropdown>
                            <Button variant="success">Split Button</Button>

                            <Dropdown.Toggle
                              split
                              variant="success"
                              id="dropdown-split-basic"
                            />

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                Action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Another action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                Something else
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown> */}
                        </td>
                        <td>
                          <DropdownButton
                            // className="circlebutton"
                            title="..."
                            variant="light"
                          >
                            <Dropdown.Item
                              onClick={deletefile.bind(
                                this,
                                childFile.id,
                                childFile.filename
                              )}
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item>Move</Dropdown.Item>
                          </DropdownButton>

                          {/* <Button
                            onClick={deletefile.bind(
                              this,
                              childFile.id,
                              childFile.filename
                            )}
                          >
                            delete
                          </Button> */}
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

      {/* <Addfolderbtn currentfolder={state}> </Addfolderbtn>
      <AddFilebtn currentfolder={state}> </AddFilebtn>

      <button onClick={handleLogout}>Logout</button> */}

      {/* <Table striped hover>
        <thead>
          <tr>
            <th>File name</th>
            <th>Storage</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table> */}

      {/* {childfolders.length > 0 && (
        <>
          <h2>Folders</h2>

          {childfolders.map((childFolder) => (
            <div key={childFolder.id}>
              <Link
                to={{
                  pathname: `/Account/${childFolder.id}`,
                }}
              >
                {" "}
                <Button>{childFolder.foldername}</Button>
              </Link>
            </div>
          ))}
        </>
      )}

      {childfiles.length > 0 && (
        <>
          <h2>files</h2>

          {childfiles.map((childFile) => (
            <div key={childFile.id}>
              <Button
                onClick={deletefile.bind(
                  this,
                  childFile.id,
                  childFile.filename
                )}
              >
                delete
              </Button>
              <a
                href={childFile.fileurl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {childFile.filename}
              </a>
            </div>
          ))}
        </>
      )} */}
    </div>

    /* <Button
                onClick={downloadfile.bind(
                  this,
                  childFile.fileurl,
                  childFile.filename
                )}
              >
                download
              </Button> */
  );
};

export default Account;
