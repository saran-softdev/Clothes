import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const BACKENDURL = process.env.REACT_APP_BACKEND_URL;

  const [formData, setFormData] = useState({
    username: "",
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
      const data = await axios.post(`${BACKENDURL}/login`, formData);
      const { token } = data.data; // Assuming the token is returned in the response data
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id; // Assuming the user ID is stored in the _id field of the token payload
      console.log("Decoded User ID:", userId);
      localStorage.setItem("userId", userId);
      alert("User logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className=" d-flex justify-content-center align-items-center vh-100 ">
      <Container>
        <span className=" d-flex justify-content-center align-items-center flex-column">
          <h1>Sign In</h1>
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
                  Sign In
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

export default SignIn;
