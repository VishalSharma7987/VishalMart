import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{ objectFit: 'contain', height: '200px', padding: '1rem' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-6" title={product.title}>
            {product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title}
          </Card.Title>
          <Card.Text className="fw-bold text-success">${product.price}</Card.Text>
          <Link to={`/product/${product.id}`} className="mt-auto">
            <Button variant="primary" className="w-100">
              View Details
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
