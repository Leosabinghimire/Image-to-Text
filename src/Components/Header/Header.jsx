import React from "react";
import "./Header.css";
import { FaTelegramPlane, FaDollarSign, FaSignInAlt } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
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
      </nav>
      <div className="user-actions">
        <a href="#" className="chat-link">
          <FaTelegramPlane /> Chat
        </a>
        <a href="#" className="pricing-link">
          <FaDollarSign /> Pricing
        </a>
        <a href="$" className="login-link">
          <FaSignInAlt /> Login
        </a>
      </div>
    </div>
  );
};
