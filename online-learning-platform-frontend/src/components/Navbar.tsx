// Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Perform logout action
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        {isLoggedIn ? (
           <>
           <li><Link to="/completed-quizzes">Completed Quizzes</Link></li>
           <li><a href="#" className="logout-link" onClick={handleLogout}>Logout</a></li>
         </>
           ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
