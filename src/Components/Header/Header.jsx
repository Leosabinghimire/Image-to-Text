import React, { useState } from "react";
import "./Header.css";
import {
  FaTelegramPlane,
  FaDollarSign,
  FaSignInAlt,
  FaBars,
} from "react-icons/fa";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <nav>
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li>
            <a href="#" className="active">
              Image To Text
            </a>
          </li>
          <li>
            <a href="#">Image Translator</a>
          </li>
          <li>
            <a href="#">JPG To Word</a>
          </li>
          <li>
            <a href="#">PDF To Word</a>
          </li>
          <li>
            <a href="#">PDF To Text</a>
          </li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <FaBars />
        </div>
      </nav>
      <div className="user-actions">
        <a href="#" className="chat-link">
          <FaTelegramPlane /> Chat
        </a>
        <a href="#" className="pricing-link">
          <FaDollarSign /> Pricing
        </a>
        <a href="#" className="login-link">
          <FaSignInAlt /> Login
        </a>
      </div>
    </div>
  );
};
