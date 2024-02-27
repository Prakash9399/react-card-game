import React from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

  // The useLocation() hook returns an object
  // containing information about the current path.
  // We are using pathname key of that object to get the actual path.
  const current_path = useLocation().pathname;

  return (
    <nav className="navbar">
      <li><Link className={`home ${current_path === "/" ? "active" : ""}`} to="/">HOME</Link></li>
      <li><Link className={`easy ${current_path === "/easy" ? "active" : ""}`} to="/easy">EASY</Link></li>
      <li><Link className={`medium ${current_path === "/medium" ? "active" : ""}`} to="/medium">MEDIUM</Link></li>
      <li><Link className={`hard ${current_path === "/hard" ? "active" : ""}`} to="/hard">HARD</Link></li>
    </nav>
  )
}

export default Navbar;