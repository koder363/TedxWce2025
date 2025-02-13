import React, { useState } from "react";
import "./Nav.css";
import { FiMenu, FiX } from "react-icons/fi";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Track closing state

  const toggleMenu = () => {
    if (menuOpen) {
      // Start closing animation
      setIsClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setIsClosing(false);
      }, 600); // Match animation duration
    } else {
      setMenuOpen(true);
    }
  };

  return (
      <nav className="bar">
      <div className="logo">
        <img
          src="https://res.cloudinary.com/dnzlg8zt6/image/upload/v1737388905/logo-white_per3fd.png"
          alt="Logo"
        />
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FiX size={30} color="#fff" /> : <FiMenu size={30} color="#fff" />}
      </div>

      {/* Apply 'open' when menu is active, and 'closing' for exit animation */}
      <ul className={`nav-links ${menuOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}>
        <li className="items">
          <a href="/about"><span id="red">Home</span></a>
        </li>
        <li className="items">
          <a href="/blogs">About</a>
        </li>
        <li className="items">
          <a href="/contact">Contact</a>
        </li>
        <li className="items">
          <a href="/sponsors">Sponsors</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
