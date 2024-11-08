import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Make sure to import the CSS file

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', { emailOrUsername, password });
            setMessage("Login successful!");
            localStorage.setItem('authToken', res.data.authToken);
            navigate('/dashboard')
        } catch (error) {
            setMessage(error.response?.data.errors || "Login failed, please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input 
                    className="input-field"
                    type="text" 
                    placeholder="Email or Username" 
                    value={emailOrUsername} 
                    onChange={(e) => setEmailOrUsername(e.target.value)} 
                />
                <input 
                    className="input-field"
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button className="submit-btn" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;