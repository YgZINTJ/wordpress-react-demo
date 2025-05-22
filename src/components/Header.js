import React, { useState } from "react";
import logo from "../assets/diet.png";
import "../styles/Header.css"; // Adjust the path if needed
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="homepage-header">
      <div className="content-container header-inner">
        <img src={logo} alt="Logo" className="logo" />
        <button
          className="nav-toggle"
          onClick={() => setShowMenu(prev => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={showMenu}
        >
          ☰
        </button>
        <nav className={`main-nav ${showMenu ? "show" : ""}`}>
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/more-recipes" className="nav-link">More Recipes</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
