import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-middle">
          <p>📍 Sangli, Maharashtra, India</p>
          <p>📞 Contact: +91 98765 43210</p>
          <p>📧 Email: tedxwcesangli@gmail.com</p>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TEDxWCESangli. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
