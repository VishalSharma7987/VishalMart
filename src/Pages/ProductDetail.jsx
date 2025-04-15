import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { motion } from 'framer-motion'; // Import Framer Motion

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  const [showToast, setShowToast] = useState(false); // for success message

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true); // Show success message
  };

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Loading product...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        {/* Product Image */}
        <Col md={6} className="text-center mb-4 mb-md-0">
          <motion.div
            className="flip-container"
            whileHover={{ rotateY: 180 }} // Flip effect on hover
            transition={{ duration: 0.6 }} // Flip duration
            style={{
              perspective: '1000px', // 3D effect perspective
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.img
              src={product.image}
              alt={product.title}
              className="img-fluid product-img"
              style={{
                maxHeight: '400px',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
                backfaceVisibility: 'hidden', // Hide back face during flip
              }}
            />
          </motion.div>
        </Col>

        {/* Product Info */}
        <Col md={6}>
          <h2 className="fw-bold">{product.title}</h2>
          <h4 className="text-success my-3">${product.price}</h4>
          <p className="text-muted">{product.description}</p>

          <Button variant="warning" size="lg" onClick={handleAddToCart}>
            Add to Cart 🛒
          </Button>
        </Col>
      </Row>

      {/* Toast Message */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Product added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default ProductDetail;
