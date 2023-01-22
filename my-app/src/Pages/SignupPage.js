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
      <Container fluid className="Homescreen">
        <Row className="Homerow">
          <SignUpForm></SignUpForm>
        </Row>
      </Container>
    </div>

    // <Container>
    //   <Row>
    //     <Form onSubmit={SignUp}>
    //       <Form.Group>
    //         <Form.Control
    //           type="text"
    //           placeholder="email"
    //           onChange={(e) => setEmail(e.target.value)}
    //           value={email}
    //         />
    //         <Form.Control
    //           type="password"
    //           placeholder="Password"
    //           onChange={(e) => setPassword(e.target.value)}
    //           value={password}
    //         />
    //       </Form.Group>

    //       <div className="d-grid ">
    //         <Button
    //           variant="secondary"
    //           type="submit"
    //           size="md"
    //           style={{ background: "#845695", fontWeight: "bold" }}
    //         >
    //           submit
    //         </Button>
    //       </div>
    //     </Form>
    //   </Row>
    // </Container>
  );
}

export default SignupPage;
