import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';

export default function EditEmployee() {
  const [f_name, setName] = useState('');
  const [f_email, setEmail] = useState('');
  const [f_mobile, setMobile] = useState('');
  const [f_designation, setDesignation] = useState('');
  const [f_gender, setGender] = useState('');
  const [f_course, setCourse] = useState([]);
  const [f_image, setImage] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [cookie, setCookie] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const name = Cookies.get('name');
    if (name) {
      setCookie(name);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/employees/${id}`);
        setName(data.f_name);
        setEmail(data.f_email);
        setMobile(data.f_mobile);
        setDesignation(data.f_designation);
        setGender(data.f_gender);
        setCourse(JSON.parse(data.f_course.join(',')));
        setExistingImage(data.f_image);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    fetchEmployee();
  }, [id]);

  useEffect(() => {
    localStorage.setItem('selectedCourses', JSON.stringify(f_course));
  }, [f_course]);

  useEffect(() => {
    const storedCourses = localStorage.getItem('selectedCourses');
    if (storedCourses) {
      setCourse(JSON.parse(storedCourses));
    }
  }, []);

  // Handler to update selected courses
  const handleCourseChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCourse([...f_course, value]);
    } else {
      setCourse(f_course.filter(course => course !== value));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('f_name', f_name);
    formData.append('f_email', f_email);
    formData.append('f_mobile', f_mobile);
    formData.append('f_designation', f_designation);
    formData.append('f_gender', f_gender);
    formData.append('f_course', JSON.stringify(f_course));
    if (f_image instanceof File) {
      formData.append('f_image', f_image);
    } else {
      formData.append('f_image', existingImage);
    }

    try {
      await axios.put(`http://localhost:5001/api/employees/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error.response ? error.response.data : error.message);
    }
  };

  // Function to get selected courses display string
  const getSelectedCoursesDisplay = () => {
    return f_course.join(', '); // Join array elements with a comma and space
  };

  return (
    <Container className="mt-4">
      <h2>Edit Employee</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={f_name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={f_email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formMobile" className="mt-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="text" value={f_mobile} onChange={(e) => setMobile(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formDesignation" className="mt-3">
          <Form.Label>Designation</Form.Label>
          <Form.Select value={f_designation} onChange={(e) => setDesignation(e.target.value)}>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Designer</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formGender" className="mt-3">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Male"
              value="Male"
              checked={f_gender === 'Male'}
              onChange={(e) => setGender(e.target.value)}
              inline
            />
            <Form.Check
              type="radio"
              label="Female"
              value="Female"
              checked={f_gender === 'Female'}
              onChange={(e) => setGender(e.target.value)}
              inline
            />
          </div>
        </Form.Group>
        <Form.Group controlId="formCourse" className="mt-3">
          <Form.Label>Course</Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              label="MCA"
              value="MCA"
              checked={f_course.includes('MCA')}
              onChange={handleCourseChange}
              inline
            />
            <Form.Check
              type="checkbox"
              label="BCA"
              value="BCA"
              checked={f_course.includes('BCA')}
              onChange={handleCourseChange}
              inline
            />
            <Form.Check
              type="checkbox"
              label="BSC"
              value="BSC"
              checked={f_course.includes('BSC')}
              onChange={handleCourseChange}
              inline
            />
          </div>
        </Form.Group>
        <Form.Group controlId="formImage" className="mt-3">
          <Form.Label>Image</Form.Label>
          {existingImage && (
            <div>
              <img src={`http://localhost:5001/uploads/${existingImage}`} alt="Employee" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
          <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
        </Form.Group>
        <Form.Group controlId="formSelectedCoursesDisplay" className="mt-3">
          <Form.Label>Selected Courses</Form.Label>
          <Form.Control type="text" readOnly value={getSelectedCoursesDisplay()} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Update Employee
        </Button>
      </Form>
    </Container>
  );
}
