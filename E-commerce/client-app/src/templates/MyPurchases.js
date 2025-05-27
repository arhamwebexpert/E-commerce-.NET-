import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyPurchases = ({ userId }) => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        fetchPurchases();
    }, [userId]);

    const fetchPurchases = () => {
        fetch(`http://localhost:5091/api/cart/user-purchases/${userId}`)
            .then((response) => response.json())
            .then((data) => setPurchases(data))
            .catch((error) => console.error('Error fetching purchases:', error));
    };

    const handleDelete = async (purchaseId) => {
        try {
            const response = await fetch(`http://localhost:5091/api/cart/${purchaseId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Purchase deleted successfully');
                setPurchases((prevPurchases) =>
                    prevPurchases.filter((purchase) => purchase.id !== purchaseId)
                );
            } else {
                const errorText = await response.text();
                alert(`Failed to delete purchase: ${errorText}`);
            }
        } catch (error) {
            console.error('Error deleting purchase:', error);
            alert('An error occurred while trying to delete the purchase.');
        }
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">My Purchases</h2>
            {purchases.length > 0 ? (
                <Row className="gy-4">
                    {purchases.map(({ id, shippingAddress, items }) => {
                        const totalPurchaseCost = items
                            .reduce((total, { price, quantity }) => total + price * quantity, 0)
                            .toFixed(2);

                        return (
                            <Col md={6} lg={4} key={id}>
                                <Card className="h-100 shadow-lg border-0">
                                    {/* Card Header */}
                                    <Card.Header className="bg-primary text-white text-center">
                                        <h5 className="mb-0">Purchase ID: {id}</h5>
                                    </Card.Header>

                                    {/* Card Body */}
                                    <Card.Body>
                                        {/* Shipping Address */}
                                        <Card.Text>
                                            <strong>Shipping Address:</strong>
                                            <br />
                                            <span className="text-muted">{shippingAddress}</span>
                                        </Card.Text>

                                        {/* Items List */}
                                        <ListGroup variant="flush">
                                            {items.map(({ productName, price, quantity }, index) => (
                                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <strong>{productName}</strong>
                                                        <br />
                                                        <small className="text-muted">
                                                            ${price} x {quantity}
                                                        </small>
                                                    </div>
                                                    <span className="fw-bold">${(price * quantity).toFixed(2)}</span>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>

                                        {/* Total Cost */}
                                        <div className="mt-3 text-end">
                                            <h6 className="fw-bold text-primary">
                                                Total: ${totalPurchaseCost}
                                            </h6>
                                        </div>
                                    </Card.Body>

                                    {/* Card Footer */}
                                    <Card.Footer className="text-center bg-light">
                                        <Button
                                            variant="danger"
                                            className="w-100"
                                            onClick={() => handleDelete(id)}
                                        >
                                            Delete Purchase
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            ) : (
                <div className="text-center mt-5">
                    <p className="text-muted">No purchases to display.</p>
                </div>
            )}

        </Container>
    );
};

export default MyPurchases;
