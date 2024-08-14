import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function MainPage() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState('');

  useEffect(() => {
    const name = Cookies.get('name');
    if (name) {
      setCookie(name);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    Cookies.remove('name');
    navigate('/');
  };

  return (
    <div className="Container">
      <Navbar expand="lg" className="bg-body-primary">
        <Container fluid>
          <Navbar.Brand href="/main">EMPLOYEE DETAILS</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/main">Home</Nav.Link>
              <Nav.Link href="/employees">Employee List</Nav.Link>
            </Nav>
            {cookie && (
              <Nav className="ms-auto my-2 my-lg-0 d-flex align-items-center">
                <span className='m-2 p-2 text-center bg-black text-color-white rounded' style={{ color: "white", fontFamily: "cursive" }}>
                  {cookie}
                </span>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {cookie && (
        <Container className="text-center d-flex align-items-center flex-column justify-content-center" style={{ marginTop: "5%" }}>
          <Container className="text-center">
            <h2>Welcome to Dashboard</h2>
            <Button variant="primary" href="/create-employee" className="mt-3">
              Create Employee
            </Button>
          </Container>
        </Container>
      )}
    </div>
  );
}
