import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth, db } from "../Firebase/Firebase";
import userContext from "../Context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const SignUp = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {});
  };

  return (
    <Card style={{ width: "50%", height: "50%" }}>
      <Container fluid>
        <Row className="p-4 ">
          <Form onSubmit={SignUp}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <div className="mt-4 ">
              <Button
                variant="secondary"
                type="submit"
                size="md"
                style={{ background: "#845695", fontWeight: "bold" }}
              >
                sign up
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    </Card>
  );
}

export default SignUpForm;
