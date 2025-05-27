import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import '../styles/customer.css'

const Cart = ({ cartItems }) => {
    const removeItem = (index) => {
        cartItems.splice(index, 1); // Remove item by index
    };

    return (

        <div className="mt-5">
            <h4>Your Cart</h4>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ListGroup>
                    {cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                            {item.name} - ${item.price}
                            <Button
                                variant="danger"
                                size="sm"
                                className="float-end"
                                onClick={() => removeItem(index)}
                            >
                                Remove
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default Cart;
