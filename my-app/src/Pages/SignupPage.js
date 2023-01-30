import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import SignUpForm from "../Components/SignUpForm";

function SignupPage() {
  return (
    <div className="App">
      <Container className="Homecontainer">
        <Row className="Homerow" style={{ height: "100%" }}>
          <SignUpForm></SignUpForm>
        </Row>
      </Container>
    </div>
  );
}

export default SignupPage;
