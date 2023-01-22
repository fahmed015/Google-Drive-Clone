import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import SignInForm from "../Components/SignInForm";

function SigninPage() {
  return (
    <div className="App">
      <Container className="Homecontainer">
        <Row className="Homerow" style={{ height: "100%" }}>
          <SignInForm></SignInForm>
        </Row>
      </Container>
    </div>
  );
}

export default SigninPage;
