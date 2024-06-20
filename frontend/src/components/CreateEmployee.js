import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateEmployee() {
    const [f_name, setName] = useState('');
    const [f_email, setEmail] = useState('');
    const [f_mobile, setMobile] = useState('');
    const [f_designation, setDesignation] = useState('');
    const [f_gender, setGender] = useState('');
    const [f_course, setCourse] = useState([]);
    const [f_image, setImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('f_name', f_name);
        formData.append('f_email', f_email);
        formData.append('f_mobile', f_mobile);
        formData.append('f_designation', f_designation);
        formData.append('f_gender', f_gender);
        formData.append('f_course',f_course);
        formData.append('f_image', f_image);

        try {
            const response = await axios.post('http://localhost:5001/api/employees/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log("Created", response.data);
            navigate('/employees');
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.status === 400) {
                    setError(error.response.data.message);
                } else if (error.response.status === 500) {
                    setError('Server error, please try again later');
                } else {
                    setError('An unknown error occurred');
                }
            } else if (error.request) {
                setError('No response from the server');
            } else {
                setError('Error in setting up request');
            }
            console.error('Error creating employee', error);
        }
    };

    const handleCourseChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setCourse([...f_course, value]);
        } else {
            setCourse(f_course.filter(course => course !== value));
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Employee</h2>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={f_name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={f_email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Mobile:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={f_mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Designation:</label>
                    <select
                        className="form-select"
                        value={f_designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    >
                        <option value="">Select Designation</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender:</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                value="Male"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                value="Female"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label">Female</label>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Course:</label>
                    <div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value="JavaScript"
                                onChange={handleCourseChange}
                            />
                            <label className="form-check-label">JavaScript</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value="Python"
                                onChange={handleCourseChange}
                            />
                            <label className="form-check-label">Python</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value="Java"
                                onChange={handleCourseChange}
                            />
                            <label className="form-check-label">Java</label>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Image:</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Employee</button>
            </form>
        </div>
    );
}
