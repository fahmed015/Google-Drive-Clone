import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Card } from 'react-bootstrap';
import { signIn } from '../Firebase/Firebase';

function SigninForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrormsg] = useState('');

  const SignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const error = await signIn(email, password);
    if (!!error) {
      setErrormsg(error);
    } else {
      navigate('/Account');
    }
  };

  return (
    <Card className='signcard'>
      <Container fluid>
        <Row className='signrow'>
          <Form onSubmit={SignIn}>
            <Form.Group className='mb-4'>
              <Form.Control
                type='text'
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <div className='d-grid '>
              <Button type='submit' className='signbutton'>
                Sign In
              </Button>
            </div>
          </Form>
        </Row>
        <Row className=' p-4'>
          <div style={{ color: 'red' }}>{errormsg}</div>
          <p>
            Don't have an account yet?
            <Link to='/signup ' className='signlink'>
              {' '}
              signup
            </Link>
          </p>
        </Row>
      </Container>
    </Card>
  );
}

export default SigninForm;
