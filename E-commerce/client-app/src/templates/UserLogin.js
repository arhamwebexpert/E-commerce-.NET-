import React, { useState } from "react";
import '../styles/Admin.css'
// Define the component for user creation
const CreateUserForm = () => {
    // State to hold form inputs
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        Access : 'A' 
    });

    // State to manage success/error messages
    const [message, setMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log(formData);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const response = await fetch("http://localhost:5091/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("User created successfully!");
                setFormData({ name: "", email: "", password: "", Access : 'A' }); // Clear form
            } else {
                setMessage("Error creating user. Please try again.");
            }
        } catch (error) {
            setMessage("Error connecting to server. Please try again later.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className = "m1">Create New User</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="Access" className="form-label">Access Level</label>
                    <select
                        className="form-control"
                        id="Access"
                        name="Access"
                        value={formData.Access}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Access Level</option> {/* Default option */}
                        <option value="A">Admin (A)</option>
                        <option value="U">User (U)</option>
                        <option value="C">Company (C)</option>
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="notify-btn">Create User</button>
                </div>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default CreateUserForm;
