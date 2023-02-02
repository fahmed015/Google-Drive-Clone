import SigninForm from '../Components/SigninForm';
import { Row, Container } from 'react-bootstrap';
import React from 'react';
function SigninPage() {
  return (
    <div className='App'>
      <Container className='Homecontainer'>
        <Row className='Homerow' style={{ height: '100%' }}>
          <SigninForm></SigninForm>
        </Row>
      </Container>
    </div>
  );
}

export default SigninPage;
