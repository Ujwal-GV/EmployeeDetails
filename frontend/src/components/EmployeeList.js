import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.css';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();
  const[cookie, setCookie] = useState('');

  useEffect(() => {
    const name = Cookies.get('name');
    if(name){
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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get('https://employee-info-crud.onrender.com/api/employees');
        setEmployees(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.f_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://employee-info-crud.onrender.com/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      {/* <Navbar expand="lg" className="bg-body-primary mb-4">
        <Container fluid>
          <Navbar.Brand href="/main">EMPLOYEE DETAILS</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/main">Home</Nav.Link>
              <Nav.Link href="/employees">Employee List</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
          </Navbar> */}

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
          {cookie ? (
          <>
            {/* <Container style={{ marginRight:"0" }}>
            <span className='m-2 p-2 w-25 text-center bg-black text-color-white rounded' style={{ color: "white", fontFamily: "cursive" }}>{cookie}</span>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
            </Container> */}

            {/* <Container style = {{ width: "20%", marginRight: "0", marginTop: "0" }}>
          <span className='m-2 p-2 w-50 text-center bg-black text-color-white rounded' style={{ color: "white", fontFamily: "cursive" }}>{cookie}</span>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Container> */}

            <Container className='m-5'>
        <Form className="mb-4">
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Designation</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(employee => (
                <tr key={employee._id}>
                  <td>{employee.f_name}</td>
                  <td>{employee.f_email}</td>
                  <td>{employee.f_mobile}</td>
                  <td>{employee.f_gender}</td>
                  <td>{employee.f_course.join(', ')}</td>
                  <td>{employee.f_designation}</td>
                  <td>
                  {employee.f_image && (
                      <img
                        src={`https://employee-info-crud.onrender.com/uploads/${employee.f_image}`}
                        alt={employee.f_name}
                        style={{ width: '50px', height: '50px' }}
                      />
                    )}
                    </td>
                  <td>
                    <Button variant="warning" as={Link} to={`/edit-employee/${employee._id}`} className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(employee._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No employees found</td>
              </tr>
            )}
          </tbody>
        </Table>
        <p>Total Employees: {filteredEmployees.length}</p>
      </Container>
          </>
        ) : null}
      
    </div>
  );
}
