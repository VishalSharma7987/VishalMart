import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Header from './Components/Header';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Automatically navigate to login if there's no token
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <>
      {/* Header will be shown if token exists */}
      {token && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protecting routes that require login */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
