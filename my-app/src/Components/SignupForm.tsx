import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Card, Container, Spinner } from "react-bootstrap";
import { signUp } from "../Firebase/Firebase";
function SignupForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errormsg, setErrormsg] = useState<string>("");
  const [disablebtn, setDisablebtn] = useState<boolean>(false);
  const SignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisablebtn(true);
    const error = await signUp(email, password, name);

    if (!!error) {
      setDisablebtn(false);
      setErrormsg(error);
    } else {
      navigate("/signin");
    }
  };

  return (
    <Card className="signcard">
      <Container fluid>
        <Row className="signrow">
          <Form onSubmit={(e) => SignUp(e)}>
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
                className="signbutton"
                disabled={disablebtn}
              >
                {disablebtn && (
                  <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
                Sign Up
              </Button>
              <div style={{ color: "red" }}>{errormsg}</div>
            </div>
          </Form>
        </Row>
      </Container>
    </Card>
  );
}

export default SignupForm;
