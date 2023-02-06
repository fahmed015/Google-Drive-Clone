import React from "react";
import background from "../BACK.jpg";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Row, Col, Image, Container } from "react-bootstrap";
// import { StateRoot } from '../Store/Reducer';
export default function HomePage() {
  const navigate = useNavigate();
  const user = useSelector((state: StateRoot) => state.user);

  const navigateTo = () => {
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
            <h1 className="my-4 display-4  px-3 info">
              Manage <span className="maincolor">all your files </span>
              <br />
              in <span className="maincolor"> one place</span>
            </h1>
            <p className="info">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
            <div className="startbtn">
              <Button
                style={{ backgroundColor: "#5964ff" }}
                size="lg"
                onClick={navigateTo}
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
