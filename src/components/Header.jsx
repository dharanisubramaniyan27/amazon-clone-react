import React from "react";
import "./Header.css"; // ✅ make sure only Header.css is imported

function Header({ cartCount }) {
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
        <span>
          Cart
          <span className="cartCount">{cartCount}</span>
        </span>
      </div>
    </div>
  );
}

export default Header;
