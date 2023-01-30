import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import userContext from "../Context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";
export default function NavBar() {
  // var user = useContext(userContext);

  var user = useSelector((state) => state.user);
  console.log(user);
  if (!!user === false || Object.keys(user).length === 0) {
    console.log(user);
    user = null;
  }
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    // setPersistence(auth, inMemoryPersistence)
    //   .then(() => {})
    //   .catch((error) => {
    //     console.log(error);
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });

    signOut(auth)
      .then(() => {
        console.log("outt");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          <div style={{ color: "#7a82f2", fontWeight: "bold" }}>
            {" "}
            Google Docs{" "}
          </div>
        </Navbar.Brand>

        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {
              !!user ? (
                <NavDropdown
                  title={<div className="avatar">{user.displayName}</div>}
                >
                  <NavDropdown.Item>{user.email}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <></>
              )
              //
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
