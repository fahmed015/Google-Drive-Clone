import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { mapAuthCodeToMessage } from "../Firebase/Firebase";
function SigninForm() {
  //   const { value } = useContext(userContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");

  const SignIn = (e) => {
    e.preventDefault();

    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        navigate("/Account");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        const errordisplay = mapAuthCodeToMessage(errorCode);
        setErrormsg(errordisplay);
        console.log(errordisplay);
      });
  };

  return (
    <Card style={{ width: "50%", height: "60%" }}>
      <Container fluid style={{ height: "100%" }}>
        <Row
          className="p-4 "
          style={{ alignContent: "center", justifyContent: "center" }}
        >
          <Form onSubmit={SignIn}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
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
                style={{ background: "#845695", fontWeight: "bold" }}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </Row>
        <Row className=" p-4">
          <div style={{ color: "red" }}>{errormsg}</div>
          <p>Don't have an account yet? </p>
          <Link to="/signup">signup</Link>
        </Row>
      </Container>
    </Card>
  );
}

export default SigninForm;
