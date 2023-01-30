import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../Firebase/Firebase";

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

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            signOut(auth)
              .then(() => {
                console.log("outt");
                navigate("/signin");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {});
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Card style={{ width: "50%", height: "60%" }}>
      <Container fluid style={{ height: "100%" }}>
        <Row
          className="p-4 mt-5"
          style={{ alignContent: "center", justifyContent: "center" }}
        >
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

            <Form.Group className="mt-3 mb-4">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <div className="d-grid ">
              <Button
                variant="secondary"
                type="submit"
                size="md"
                style={{ background: "#7a82f2", fontWeight: "bold" }}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    </Card>
  );
}

export default SignUpForm;
