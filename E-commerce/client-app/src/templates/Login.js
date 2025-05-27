import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css"

const Login = ({ setIsAuthenticated, setUserAccess, setUserId }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5091/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message === 'Login successful') {
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('userName', data.name);
                    localStorage.setItem('userEmail', data.email);
                    localStorage.setItem('userAccess', data.access);
                    localStorage.setItem('isAuthenticated', 'true');
                    setUserId(data.userId);
                    setIsAuthenticated(true);
                    navigate('/');
                }
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="auth-container">
            <div className="login-card">
                <div className="login-left">
                    <h2 className="login-title">Sign in</h2>
                    <div className="social-icons">
                        <button className="social-btn">f</button>
                        <button className="social-btn">G</button>
                        <button className="social-btn">in</button>
                    </div>
                    <p className="or-text">or use your account</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="login-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="login-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <p className="forgot-password">Forgot your password?</p>
                        <button type="submit" className="login-button">Sign in</button>
                    </form>
                </div>
                <div className="login-right">
                    <h2>Hello, Friend!</h2>
                    <p>Enter your personal details and start your journey with us</p>
                    <button className="signup-button" onClick={handleRegisterRedirect}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
