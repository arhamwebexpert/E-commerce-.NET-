import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './templates/Navbar';
import Login from './templates/Login';
import ProductManager from './templates/product';
import CreateUserForm from './templates/UserLogin';
import AdminDashboard from './templates/AdminDashboard';
import ProductList from './templates/productList';
import Checkout from './templates/Checkout';
import RegisterUser from './templates/RegisterUser';
import MyPurchases from './templates/MyPurchases';
import UserProductList from './templates/UploadedProduct'
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userAccess, setUserAccess] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Retrieve authentication status and user role from localStorage
        const authStatus = localStorage.getItem('isAuthenticated');
        const accessRole = localStorage.getItem('userAccess');
        const storedUserId = localStorage.getItem('userId'); // Retrieve userId from localStorage

        if (authStatus === 'true') {
            setIsAuthenticated(true);
            setUserAccess(accessRole || ''); // Fallback to empty if accessRole is undefined
            setUserId(storedUserId); // Set userId from localStorage
        } else {
            setIsAuthenticated(false);
            setUserAccess('');
            setUserId(null);
        }
    }, [isAuthenticated, userAccess]); // Run effect whenever authentication or access role changes

    return (
        <Router>
            <div className="App">
                {/* Render Navbar only if the user is authenticated */}
                {isAuthenticated && <Navbar userAccess={userAccess} setIsAuthenticated={setIsAuthenticated} />}

                <Routes>
                    {/* Unauthenticated Routes */}
                    {!isAuthenticated ? (
                        <>
                            <Route path="/" element={<Navigate to="/login" />} />
                            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserAccess={setUserAccess} setUserId={setUserId} />} />
                            <Route path="/register" element={<RegisterUser />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    ) : (
                        <>
                            {/* Common Routes for Authenticated Users */}
                            {/* Admin-only Routes */}
                            {userAccess === 'A' && (
                                <>
                                        <Route path="/products" element={<ProductManager />} />
                                        <Route path="/UserProductList" element={<UserProductList />} />

                                    <Route path="/create-user" element={<CreateUserForm />} />
                                    <Route path="/" element={<AdminDashboard />} />
                                        <Route path="/checkout" element={<Navigate to="/AdminDashboard" />} />
                                 
                                </>
                            )}

                            {/* Seller-only Routes */}
                            {userAccess === 'U' && (
                                    <>
                                   
                                    <Route path="/" element={<ProductList />} />
                                    <Route path="/ProductList" element={<ProductList />} />
                                        <Route path="/checkout" element={<Checkout />} />

                                    {userId && <Route path="/mypurchase" element={<MyPurchases userId={userId} />} />}
                                </>
                            )}

                            {/* Customer-only Routes */}
                            {userAccess === 'C' && (
                                <>
                                        <Route path="/" element={<ProductList />} />
                                        <Route path="/products" element={<ProductManager />} />
                                        <Route path="/ProductList" element={<ProductList />} />
                                        <Route path="/UserProductList" element={<UserProductList />} />
                                      <Route path="/checkout" element={<Checkout />} />

                                </>
                            )}

                            {/* Redirect all other paths to the main page */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
