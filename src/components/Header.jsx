import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h2 className="logo">Amazon</h2>
      <input
        className="search"
        type="text"
        placeholder="Search Amazon"
      />
      <div className="nav">
        <span>Hello, Sign in</span>
        <span>Cart</span>
      </div>
    </div>
  );
}

export default Header;
