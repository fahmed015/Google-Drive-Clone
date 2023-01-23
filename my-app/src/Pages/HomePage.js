import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import background from "../BACK.jpg";
import NavBar from "../Components/NavBar.js";
import SigninForm from "../Components/SignInForm";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import userContext from "../Context/AuthContext";
import { useContext } from "react";

export default function HomePage() {
  const navigate = useNavigate();

  const user = useContext(userContext);
  const navigateto = () => {
    console.log(user);

    if (!!user) {
      navigate("/Account");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="App">
      <NavBar />

      <Container className="Homecontainer">
        <Row className="Homerow">
          <Col>
            <h1
              className="my-4 display-4 fw-bold  px-3"
              style={{ color: "black", textAlign: "center" }}
            >
              Manage <span style={{ color: "#7a82f2" }}>all your files </span>
              <br />
              in <span style={{ color: "#7a82f2" }}> one place</span>
            </h1>
            <p style={{ color: "black", textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
            <div
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Button
                style={{ backgroundColor: "#5964ff" }}
                size="lg"
                onClick={navigateto}
              >
                Get started
              </Button>
            </div>
          </Col>

          <Col>
            <Image fluid src={background}></Image>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
