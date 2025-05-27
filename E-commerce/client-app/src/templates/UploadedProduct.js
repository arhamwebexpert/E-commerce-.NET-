import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css'
const UserProductsList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const userIdFromLocalStorage = localStorage.getItem('userId');
                if (!userIdFromLocalStorage) {
                    throw new Error('User not logged in.');
                }

                const response = await fetch('http://localhost:5091/api/product', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products.');
                }

                const productsData = await response.json();

                // Filter products by userId
                const userProducts = productsData.filter(
                    (product) => product.userId === userIdFromLocalStorage
                );

                setProducts(productsData);
                setFilteredProducts(userProducts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                Error: {error}
            </div>
        );
    }

    return (
        <div
            className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage:
                    "url('../assets/banner.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
            }}
        >
            <div className="container p-4 bg-dark bg-opacity-75 rounded shadow-lg">
                <h2 className="text-center mb-4 text-uppercase fw-bold" style={{ color: '#b71c1c' }}>
                    My Products
                </h2>
                {filteredProducts.length > 0 ? (
                    <div className="row">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{product.name}</h5>
                                        <p className="card-text text-muted">{product.description}</p>
                                        <p className="card-text">
                                            <strong>Price:</strong> ${product.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-warning text-center" role="alert">
                        No products found for your account.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProductsList;
