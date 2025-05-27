import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin.css';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductDescription, setNewProductDescription] = useState("");
    const [newQuantity, setNewQuantity] = useState(0);
    const [newCategory, setNewCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);

    // Fetch products from the API when the component mounts
    useEffect(() => {
        axios.get("http://localhost:5091/api/product")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    // Handle image file selection
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Handle adding a new product
    const handleAddProduct = () => {
        if (!newProductName || !newProductPrice) {
            alert("Please provide both a name and a price for the product.");
            return;
        }

        if (!imageFile) {
            alert("Please upload an image for the product.");
            return;
        }

        // Retrieve the userId and token from local storage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert("User not authenticated. Please log in.");
            return;
        }

        const formData = new FormData();
        formData.append('Name', newProductName);
        formData.append('Price', parseFloat(newProductPrice));
        formData.append('Description', newProductDescription);
        formData.append('Category', newCategory);
        formData.append('Quantity', newQuantity);
        formData.append('InStock', true);
        formData.append('image', imageFile);
        formData.append('UserId', userId); // Include the user ID in the form data

        axios.post("http://localhost:5091/api/product", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                setProducts([...products, response.data]);
                setNewProductName("");
                setNewProductPrice("");
                setNewProductDescription("");
                setNewCategory("");
                setNewQuantity(0);
                setImageFile(null);
            })
            .catch(error => {
                console.error('There was an error adding the product:', error);
                if (error.response && error.response.data) {
                    alert(`Error: ${JSON.stringify(error.response.data)}`);
                }
            });
    };


    return (
        <div className="container mt-5">
            <h1 className="m1">Product Manager</h1>

            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        className="form-control"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        placeholder="Enter product name"
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="productPrice" className="form-label">Product Price</label>
                    <input
                        type="number"
                        id="productPrice"
                        className="form-control"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        placeholder="Enter product price"
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="productDescription" className="form-label">Product Description (Optional)</label>
                    <input
                        type="text"
                        id="productDescription"
                        className="form-control"
                        value={newProductDescription}
                        onChange={(e) => setNewProductDescription(e.target.value)}
                        placeholder="Enter product description"
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="category" className="form-label">Category (Optional)</label>
                    <input
                        type="text"
                        id="category"
                        className="form-control"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter category"
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        className="form-control"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        placeholder="Enter product quantity"
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="productImage" className="form-label">Product Image</label>
                    <input
                        type="file"
                        id="productImage"
                        className="form-control"
                        onChange={handleImageChange}
                    />
                </div>
            </div>

            <div className="text-center">
                <button onClick={handleAddProduct} className="notify-btn">
                    Add Product
                </button>
            </div>
        </div>
    );
};

export default ProductManager;
