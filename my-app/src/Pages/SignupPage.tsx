import React from 'react';
import { Row, Container } from 'react-bootstrap';
import SignupForm from '../Components/SignupForm';

function SignupPage() {
  return (
    <div className='App'>
      <Container className='Homecontainer'>
        <Row className='Homerow' style={{ height: '100%' }}>
          <SignupForm></SignupForm>
        </Row>
      </Container>
    </div>
  );
}

export default SignupPage;
