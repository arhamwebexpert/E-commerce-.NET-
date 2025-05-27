import React, { useState, useEffect } from 'react';
import EditProductModal from './EditProduct';
import EditUserModal from './EditUser';
import '../styles/Admin.css'
const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);  // State for selected product
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);  // State for product modal visibility

    // Fetch Users
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5091/api/user');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch Products
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5091/api/product');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Fetch users and products on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchUsers();
            await fetchProducts();
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                // Make a DELETE request to the backend
                const response = await fetch(`http://localhost:5091/api/user/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove the user from the frontend state
                    setUsers(users.filter(user => user.id !== id));
                } else {
                    console.error('Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };
    // Handle Delete Product
    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:5091/api/product/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setProducts(products.filter(product => product.id != id));
                }
                else {
                    console.error('Failed to delete the user ');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    // Handle Edit User
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsUserModalOpen(true);
    };

    const handleCloseUserModal = () => {
        setIsUserModalOpen(false);
        setSelectedUser(null);
    };

    const handleSubmitUser = async (id, updatedUserData) => {
        try {
            const response = await fetch(`http://localhost:5091/api/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData)
            });

            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Handle Edit Product
    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const handleCloseProductModal = () => {
        setIsProductModalOpen(false);
        setSelectedProduct(null);
    };

    const handleSubmitProduct = async (id, updatedProductData) => {
        try {
            const response = await fetch(`http://localhost:5091/api/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData)
            });

            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="m1">Admin Dashboard</h1>

            {/* Users Table */}
            <h2 className="text-center">Users</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Access</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.access}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Products Table */}
            <h2 className="text-center mt-5">Products</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => handleEditProduct(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit User Modal */}
            {isUserModalOpen && selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    handleSubmit={handleSubmitUser}
                    handleClose={handleCloseUserModal}
                />
            )}

            {/* Edit Product Modal */}
            {isProductModalOpen && selectedProduct && (
                <EditProductModal
                    product={selectedProduct}
                    handleSubmit={handleSubmitProduct}
                    handleClose={handleCloseProductModal}
                />
            )}
        </div>
    );
};

export default AdminDashboard;