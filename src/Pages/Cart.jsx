import { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Image,
  Form,
} from 'react-bootstrap';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle Checkout - Clear cart and show confirmation message
  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 4000); // Hide the success message after 4 seconds
  };

  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // Prevent quantity from going below 1
    updateQuantity(id, quantity); // Update quantity in the context
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">🛒 Your Shopping Cart</h2>

      {/* Success Message after placing order */}
      {orderPlaced && (
        <Alert variant="success" className="fade show">
          ✅ Order placed successfully!
        </Alert>
      )}

      {/* If cart is empty */}
      {cart.length === 0 ? (
        <Alert variant="info">Your cart is empty. Start shopping!</Alert>
      ) : (
        <>
          <Row className="g-4">
            {/* Display cart items */}
            {cart.map((item) => (
              <Col md={6} lg={4} key={item.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.title}
                    style={{
                      height: '250px',
                      objectFit: 'contain',
                      padding: '1rem',
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> ${item.price.toFixed(2)} <br />
                      <strong>Quantity:</strong>
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value))
                        }
                        min="1"
                        className="mt-2"
                      />
                    </Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                      className="mt-auto"
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Total & Checkout Button */}
          <div className="text-end mt-4">
            <h4>Total: <span className="text-success">${total.toFixed(2)}</span></h4>
            <Button variant="success" size="lg" className="mt-2" onClick={handleCheckout}>
              Checkout 🧾
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
