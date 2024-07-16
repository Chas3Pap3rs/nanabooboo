import React, { useState, useEffect } from 'react';
import ImageHover from './ImageHover';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '/src/context/AuthContext'; 


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [forceHover, setForceHover] = useState(false);
  const { isAuthenticated, setAuthenticated } = useAuth();
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';
  const user_id = localStorage.getItem('user_id')


  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('username:', username);
    console.log('user_id:', user_id);

    const handleResize = () => {
      // Check if window width is less than or equal to 1000px
      if (window.innerWidth <= 1000) {
        setForceHover(isOpen); // Use isOpen state to determine forceHover
      } else {
        setForceHover(false); // Force close the image when window width is greater than 1000px
      }
    };

    // Call handleResize on component mount to set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);

    
    }, [isOpen, isAuthenticated]); // Re-run effect when isOpen changes


    const handleLogoClick = () => {
        if (window.innerWidth > 1000) {
            navigate('/');
        } else {
            setIsOpen(!isOpen);
        }
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username'); // Clear the username
      localStorage.removeItem('user_id');
      setAuthenticated(false);
      navigate('/login');
    };

  return (
    <>
      <h3>Welcome, {username}!</h3>

      <div className="header-container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#">
            <button className="large-logo-navbar-toggler" type="button" onClick={handleLogoClick}>
              <ImageHover size="75%" forceHover={forceHover} className="imageHoverMargin" />
            </button>
          </Navbar.Brand>
          {isOpen && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/" className="btn">Home</Link>
                <Link to="conversions" className="btn">Nanerverter</Link>
                <Link to="recipes" className="btn">Banana Recipes</Link>
                <Link to="/funfacts" className="btn">Banana Fun Facts</Link>
                <Link to="/books" className="btn">Banana Books</Link>
                {isAuthenticated ? (
                  <>
                    <button onClick={handleLogout} className="btn">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn">Login</Link> or
                    <Link to="/signup" className="btn">Signup</Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          )}
        </Navbar>
      </div>
    </>
  );
};

export default Header;