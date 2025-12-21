import { Link } from "react-router-dom";
import "./Header.css";

function Header({ cartCount }) {
  return (
    <div className="header">
      <h2 className="logo">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Amazon
        </Link>
      </h2>

      <input className="search" type="text" placeholder="Search Amazon" />

      <div className="nav">
        <span>Hello, Sign in</span>

        <Link to="/cart">
          Cart
          <span className="cartCount">{cartCount}</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
