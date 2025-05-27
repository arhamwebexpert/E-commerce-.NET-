import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const [formData, setFormData] = useState({ email: '', password: '', name: '', Access: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5091/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Registration successful! Please login.');
                navigate('/'); // Redirect to login page after successful registration
            } else {
                alert('Error during registration');
            }
        } catch (error) {
            console.error('Error during registration', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="auth-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="auth-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="auth-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <select
                            className="auth-input"
                            id="Access"
                            name="Access"
                            value={formData.Access}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Access Level</option>
                            <option value="U">User</option>
                            <option value="C">Seller</option>
                        </select>
                    </div>
                    <button type="submit" className="auth-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;
