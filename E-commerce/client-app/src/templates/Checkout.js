import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Card, ListGroup, Row, Col } from 'react-bootstrap';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cartItems = location.state?.cart || [];
    const [address, setAddress] = useState('');
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage

    const handleSubmit = async () => {
        if (!address) {
            alert('Please enter your shipping address');
            return;
        }

        const cartData = {
            userId: userId,
            shippingAddress: address,
            items: cartItems.map((item) => ({
                productName: item.name,
                price: item.price, // Unit price
                quantity: item.quantity, // Quantity of the product
            })),
        };

        console.log('Cart data being sent:', cartData);

        try {
            const response = await fetch('http://localhost:5091/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Purchase successful!');
                navigate('/');
            } else {
                const errorText = await response.text();
                try {
                    const errorData = JSON.parse(errorText);
                    console.error('Error details:', errorData);
                    alert(
                        'Failed to submit the cart. Details: ' +
                        (errorData.message || 'Check console for more.')
                    );
                } catch {
                    console.error('Non-JSON response:', errorText);
                    alert(
                        'Failed to submit the cart. Server returned a non-JSON response.'
                    );
                }
            }
        } catch (error) {
            console.error('Error submitting cart:', error);
        }
    };

    // Calculate the total price of the cart based on quantities
    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    return (
        <div className="container mt-5">
            {/* Checkout Header */}
            <h2 className="text-center mb-4">Checkout</h2>

            <Row className="gy-4">
                {/* Cart Summary Section */}
                <Col md={7}>
                    <Card className="shadow border-0">
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Billing Details</h4>
                        </Card.Header>
                        <Card.Body>
                            {cartItems.map((item, index) => (
                                <ListGroup variant="flush" key={index}>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={6} md={8}>
                                                <strong>Product:</strong> {item.name} <br />
                                                <strong>Price per unit:</strong> ${item.price} <br />
                                                <strong>Quantity:</strong> {item.quantity}
                                            </Col>
                                            <Col xs={6} md={4} className="text-end">
                                                <strong>Total Price:</strong>
                                                <br />
                                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            ))}
                        </Card.Body>
                        <Card.Footer>
                            <h5 className="text-center text-primary fw-bold">
                                Grand Total: ${calculateTotal()}
                            </h5>
                        </Card.Footer>
                    </Card>
                </Col>

                {/* Address Form Section */}
                <Col md={5}>
                    <Card className="shadow border-0">
                        <Card.Header className="bg-secondary text-white text-center">
                            <h4>Shipping Address</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Enter your address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="123 Main St, City, Country"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    variant="success"
                                    className="mt-4 w-100"
                                    onClick={handleSubmit}
                                >
                                    Submit Order
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
    
export default Checkout;
