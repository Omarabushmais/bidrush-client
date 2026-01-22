import React from 'react';
import logo from "../../assets/Logo.png";

function Footer() {
  return (
    <footer className="text-light py-4 text-center" style={{ backgroundColor: '#091B5A' }}>
      <img src={logo} alt="BidRush logo" className="mb-2" style={{ height: '40px' }} />

      <nav className="d-flex justify-content-center gap-2 mb-2">
        <a href="/" className="text-light text-decoration-none">Home</a>
        <span className="text-light">|</span>
        <a href="/auctions" className="text-light text-decoration-none">Auctions</a>
        <span className="text-light">|</span>
        <a href="/about" className="text-light text-decoration-none">About</a>
      </nav>

      <p className="mb-0" style={{ fontSize: '0.875rem' }}>
        © 2025 BidRush. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
