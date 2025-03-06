import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import NavBar from './NavBar';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/user/login', { username, password });
            console.log("Full API Response:", res.data);
            const user = res.data;
            console.log(user);
            if (res.status === 200) {
                const { message, userId, role } = res.data; // Access the response data directly
                console.log("User ID:", userId);

                setMessage(message);
                setMessageType("success");

                if (userId && userId !== 0) {
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('userRole', role);

                    // Navigate based on user role
                    if (role === "Admin") {
                        navigate("/admin"); // Redirect to admin page
                    } else if (role === "User") {
                        navigate("/user"); // Redirect to user page
                    }
                } else {
                    setMessage("Invalid ID returned from server");
                    setMessageType("danger");
                }
            }
        } catch (err) {
            console.log("Login error:", err);
            setMessage("Invalid credentials or server error");
            setMessageType("danger");
        }
    };

    return (
        <div>
            {message && <div className={`alert alert-${messageType}`}>{message}</div>}
            <NavBar></NavBar>
            
            <div className='container col-8'>
                <div style={{ background: 'orange' }} className="card p-4 border shadow">
                    <h4>Login</h4>
                    <Form onSubmit={handleLogin}>
                        <Form.Control className='m-2' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Form.Control className='m-2' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type='submit' className='m-2'>Login</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
