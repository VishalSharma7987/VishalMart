import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Badge, IconButton, Tooltip } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleLogout = () => {
    
    localStorage.removeItem('token');

   
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand fs-3 fw-bold me-3">
          V<span className="text-warning">Mart</span>
        </Link>

       
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={navbarOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

       
        <form className="d-flex flex-grow-1 justify-content-center mx-4 d-none d-md-flex">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search products..."
          />
          <button className="btn btn-warning ms-2" type="submit">
            Search
          </button>
        </form>


        <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Tooltip title="Home">
                <Link to="/" className="nav-link">
                  <HomeIcon sx={{ color: 'white' }} />
                </Link>
              </Tooltip>
            </li>

            <li className="nav-item">
              <Tooltip title="Cart">
                <Link to="/cart" className="nav-link">
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon sx={{ color: 'white' }} />
                  </Badge>
                </Link>
              </Tooltip>
            </li>

            <li className="nav-item">
              <Tooltip title="Logout">
                <IconButton onClick={handleLogout} className="nav-link">
                  <LogoutIcon sx={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
