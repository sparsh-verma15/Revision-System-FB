import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../api/api";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import './Login.css'
import logo from "../logo.png"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showUsernameError, setShowUsernameError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    
    const auth = useAuthContext();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        // Check if fields are empty
        if (username === '') {
            setShowUsernameError(true);
            return;
        } else {
            setShowUsernameError(false);
        }
        if (password === '') {
            setShowPasswordError(true);
            return;
        } else {
            setShowPasswordError(false);
        }
        try {
            const response = await axiosInstance.post('/users/login', { username: username, password: password });
            const userStore = {
                token: response.data.token,
                user_id: response.data.user.user_id,
                username: response.data.user.username,
            }
            localStorage.setItem('user', JSON.stringify(userStore));
            auth.login(userStore);
            navigate('/categories');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <>
            <div className="login-container">
                <Row className="justify-content-center align-items-center full-height">
                    <Col>
                        <div className="login-form">
                            <Row className="d-flex justify-content-center mb-2">
                                <Col xs={4}>
                                    <Image src={logo} fluid/>
                                </Col>
                            </Row>
                            <h2>Login</h2>
                            <Form className="w-75">
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value.trim())}
                                        isInvalid={showUsernameError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Username is required.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value.trim())}
                                        isInvalid={showPasswordError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Password is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                

                                <Button variant="primary" className="mt-2 w-100" onClick={handleLogin}>
                                    Login
                                </Button>

                                <Button variant="secondary w-100 mt-2" onClick={() => navigate('/signup')}>
                                    Sign Up
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Login;
