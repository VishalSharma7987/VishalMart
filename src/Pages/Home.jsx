import { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import { Container, Row, DropdownButton, Dropdown } from 'react-bootstrap';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch products and categories when the component mounts
  useEffect(() => {
    // Fetch categories
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));

    // Fetch products
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      // If 'all' is selected, fetch all products
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    } else {
      // If a category is selected, fetch products by category
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => setProducts(data));
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Latest Products</h2>

      {/* Category Dropdown */}
      <DropdownButton
        id="category-dropdown"
        title={`Filter by Category: ${selectedCategory === 'all' ? 'All' : selectedCategory}`}
        onSelect={handleCategoryChange}
        className="mb-4"
      >
        <Dropdown.Item eventKey="all">All</Dropdown.Item>
        {categories.map((category, index) => (
          <Dropdown.Item key={index} eventKey={category}>
            {category}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <Row>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
