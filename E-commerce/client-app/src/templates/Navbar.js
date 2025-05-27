import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ userAccess, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userAccess');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        navigate('/'); // Redirect to login after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">E-Commerce</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Common routes for all authenticated users */}
                        
                        {/* Admin-only links */}
                        {userAccess === 'A' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/products">Manage Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create-user">Create User</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/AdminDashboard">Admin Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/UserProductList">Your Products</Link>
                                </li>

                            </>
                        )}

                        {/* Seller-only links */}
                        {userAccess === 'U' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/checkout">Checkout</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Product List</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/mypurchase">Logs</Link>
                                </li>
                          
                            </>
                        )}

                        {/* Customer-only links */}
                        {userAccess === 'C' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/checkout">Checkout</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Product List</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/UserProductList">Your Items</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/products">Manage Products</Link>
                                </li>


                            </>
                        )}
                    </ul>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
