import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import userContext from "../Context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const user = useContext(userContext);
  const navigate = useNavigate();
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <span style={{ color: "#7a82f2", fontWeight: "bold" }}>
            {" "}
            Google Docs{" "}
          </span>
        </Navbar.Brand>

        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link>
              {" "}
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                About
              </span>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Features
              </span>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Pricing
              </span>{" "}
            </Nav.Link>

            {!!user.uid ? (
              <NavDropdown
                title={
                  <div style={{ background: "purple" }} className="avatar">
                    F
                  </div>
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Acoount</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link>
                <Button
                  style={{ backgroundColor: "#5964ff" }}
                  // size="lg"
                  onClick={() => navigate("/signin")}
                >
                  Get started
                </Button>
              </Nav.Link>
            )}

            {/* <Nav.Link>
              <Button
                style={{ backgroundColor: "#5964ff" }}
                // size="lg"
                onClick={() => navigate("/signin")}
              >
                Get started
              </Button>
            </Nav.Link>

            <NavDropdown
              title={
                <div style={{ background: "purple" }} className="avatar">
                  F
                </div>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
