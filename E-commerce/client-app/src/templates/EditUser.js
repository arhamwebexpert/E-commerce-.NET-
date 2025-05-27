
import React, { useState } from 'react';




const EditUserModal = ({ user, handleSubmit, handleClose }) => {
    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password || '',  // Prepopulate the form with an existing password
        access: user.access,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const onSubmit = (e) => {
        e.preventDefault();

        // Validate password is not empty
        if (!formData.password || formData.password.trim() === "") {
            alert("Password cannot be empty!");
            return;
        }

        handleSubmit(user.id, formData);  // Call the parent's submit handler with the updated user data

    };

    return (
        <div className="modal show d-block" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit User</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
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
                            <div className="mb-3">
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
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required  // Add required attribute
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="access" className="form-label">Access Level</label>
                                <select
                                    className="form-control"
                                    id="access"
                                    name="access"
                                    value={formData.access}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="A">Admin (A)</option>
                                    <option value="U">User (U)</option>
                                    <option value="C">Company (C)</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;