import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Card, Container } from 'react-bootstrap';
import { signUp } from '../Firebase/Firebase';
function SignupForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const SignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const error = await signUp(email, password, name);
    if (!!error) {
      setErrormsg(error);
    } else {
      navigate('/signin');
    }
  };

  return (
    <Card className='signcard'>
      <Container fluid>
        <Row className='signrow'>
          <Form onSubmit={SignUp}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Control
                type='text'
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className='mt-3 mb-4'>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <div className='d-grid '>
              <Button variant='secondary' type='submit' className='signbutton'>
                Sign Up
              </Button>
              <div style={{ color: 'red' }}>{errormsg}</div>
            </div>
          </Form>
        </Row>
      </Container>
    </Card>
  );
}

export default SignupForm;
