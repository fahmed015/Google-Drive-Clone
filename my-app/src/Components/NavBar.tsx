import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logOut } from '../Firebase/Firebase';
import { NavDropdown, Navbar, Container, Nav } from 'react-bootstrap';
import { StateRoot } from '../Store/Reducer';
export default function NavBar() {
  var user = useSelector((state: StateRoot) => state.user);
  if (!!user === false || Object.keys(user).length === 0) {
    user = null;
  }
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logOut();

    navigate('/');
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href='/'>
          <div style={{ color: '#7a82f2', fontWeight: 'bold' }}> Google Docs </div>
        </Navbar.Brand>

        <Navbar.Collapse className='justify-content-end'>
          {/* <Nav className="me-auto"></Nav> */}
          <Nav>
            {
              !!user ? (
                <NavDropdown
                  title={
                    <div className='avatar'>{user.displayName}</div>
                    // .charAt(0)
                  }
                  align='end'>
                  <NavDropdown.Item onClick={() => navigate('/account')}>
                    {user.email}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <></>
              )
              //
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
