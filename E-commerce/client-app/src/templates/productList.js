import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Spinner, Badge, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/customer.css';
import image1 from '../assests/banner.jpg'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({}); // State to track quantity for each product
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5091/api/product')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleQuantityChange = (productId, quantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };

    const addToCart = (product) => {
        const quantity = quantities[product.id] || 1; // Default to 1 if not specified
        const productWithQuantity = { ...product, quantity };

        setCart((prevCart) => [...prevCart, productWithQuantity]);
        alert(`${product.name || 'Unknown'} added to cart with quantity: ${quantity}`);
    };

    const proceedToCheckout = () => {
        navigate('/checkout', { state: { cart } });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger mt-3">Error: {error}</div>;
    }

    return (
        <div className="main">
            {/* Carousel Section */}
            <Carousel className="mb-4">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image1} // Replace with actual image URL
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>E-STORE</h3>
                        <p>
                            Visit E-Store today and embark on a journey into the world of many products, where innovation meets service, and your satisfaction is our commitment.
                        </p>
                        <Button variant="primary">Shop Now</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                {/* Add more Carousel.Item blocks as needed */}
            </Carousel>

            {/* Product List Section */}
            <div className="container">
                <h2 className="text-center mb-4">LATEST PRODUCTS</h2>
                <Row xs={1} sm={2} md={3} className="g-4">
                    {products.map((product) => (
                        <Col key={product.id}>
                            <Card className="h-100 shadow-sm product-card">
                                <div className="position-relative">
                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:5091${product.imageUrl}`}
                                        alt={product.name}
                                        className="card-img-top-custom"
                                    />
                                    <Badge bg="warning" className="price-badge">
                                        ${product.price}/-
                                    </Badge>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-center">{product.name}</Card.Title>
                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-center mb-2">
                                            <input
                                                type="number"
                                                min="1"
                                                defaultValue="1"
                                                className="form-control quantity-input"
                                                onChange={(e) =>
                                                    handleQuantityChange(product.id, parseInt(e.target.value, 10))
                                                }
                                            />
                                        </div>
                                        <Button
                                            variant="primary"
                                            className="w-100"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add To Cart
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="text-center mt-4">
                    {cart.length > 0 && (
                        <Button variant="success" size="lg" onClick={proceedToCheckout} className="shadow">
                            Proceed to Checkout
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
