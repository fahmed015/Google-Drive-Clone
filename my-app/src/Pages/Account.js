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

import Button from "react-bootstrap/Button";
import { signOut } from "firebase/auth";
import { db } from "../Firebase/Firebase";
import NavBar from "../Components/NavBar.js";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import { getStorage, ref, deleteObject, getBlob } from "firebase/storage";

import { doc, deleteDoc } from "firebase/firestore";

import userContext from "../Context/AuthContext";
import { useContext } from "react";
import UseFolder from "../Hooks/UseFolder";
import { useParams } from "react-router-dom";

const Account = () => {
  const user = useContext(userContext);
  const { folderId } = useParams();
  console.log(folderId);

  const state = UseFolder(folderId);

  const childfolders = state.childfolder;
  const childfiles = state.childfile;

  console.log(state);

  const navigate = useNavigate();

  const deletefile = (id, name) => {
    deleteDoc(doc(db, "file", id))
      .then(() => {
        console.log("Document successfully deleted!");

        const storage = getStorage();

        // Create a reference to the file to delete
        const deleteRef = ref(storage, name);

        // Delete the file
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

    // const xhr = new XMLHttpRequest();
    // xhr.responseType = "blob";
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open("GET", url);
    // xhr.send();
  };

  const deletefolder = (id) => {
    deleteDoc(doc(db, "file", id))
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    // const xhr = new XMLHttpRequest();
    // xhr.responseType = "blob";
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open("GET", url);
    // xhr.send();
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

  const handleLogout = () => {
    const auth = getAuth();
    setPersistence(auth, inMemoryPersistence)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <NavBar />
      {/* <h1>Account</h1>
      <p>User Email: {user.email}</p>
      <p>User id: {user.uid}</p>
      <p>Name {user.displayName}</p>
      */}

      <Container className="Homecontainer">
        <Row className="Homerow" style={{ height: "90%" }}>
          <div className="carddrive">
            <Row className="mt-5">
              <Col>
                <h1 className="  fw-bold  " style={{ color: "#7a82f2" }}>
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

            <Row>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>File name</th>
                    <th>Storage</th>
                    <th>date</th>
                  </tr>
                </thead>
                <tbody>
                  {childfolders.map((childFolder) => {
                    return (
                      <tr key={childFolder.id}>
                        <td>
                          {" "}
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
                          <Button
                            onClick={deletefolder.bind(this, childFolder.id)}
                          >
                            delete
                          </Button>
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
                          >
                            {childFile.filename}
                          </a>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td>
                          <Button
                            onClick={deletefile.bind(
                              this,
                              childFile.id,
                              childFile.filename
                            )}
                          >
                            delete
                          </Button>
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
