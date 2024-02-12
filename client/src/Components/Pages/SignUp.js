import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const BACKENDURL = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKENDURL}/register`, formData);
      navigate("/signin");
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user. Please try again.");
    }
  };

  return (
    <div className=" d-flex justify-content-center align-items-center vh-100 ">
      <Container>
        <span className=" d-flex justify-content-center align-items-center flex-column">
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <span className=" d-flex justify-content-center align-items-center gap-5">
              <>
                <Button variant="primary" type="submit" className=" mt-3">
                  Sign Up
                </Button>
              </>
              <>
                <p className=" mt-4">or</p>
              </>
              <>
                <Button variant=" outline-secondary">
                  <FcGoogle className=" fs-1 mt-3" />
                </Button>
              </>
            </span>
          </Form>
        </span>
      </Container>
    </div>
  );
};

export default SignUp;
