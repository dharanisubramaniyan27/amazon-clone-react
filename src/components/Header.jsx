import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

function Header({ cartCount = 0 }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="header">
      <h2 className="logo">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Amazon
        </Link>
      </h2>

      <input className="search" type="text" placeholder="Search Amazon" />

      <div className="nav">
        {isAuthenticated ? (
          <span onClick={handleLogout} style={{ cursor: "pointer" }}>
            Hello, Sign out
          </span>
        ) : (
          <Link to="/login">Hello, Sign in</Link>
        )}

        <Link to="/cart">
          Cart
          <span className="cartCount">{cartCount}</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
