import { Link } from "react-router-dom";
import "./Header.css";
import { useStateValue } from "../context/StateProvider";

function Header() {
  const [{ user, cart }] = useStateValue();

  return (
    <div className="header">
      <h2 className="logo">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Amazon
        </Link>
      </h2>

      <input className="search" type="text" placeholder="Search Amazon" />

      <div className="nav">
        <Link to="/login">
          Hello, {user ? user : "Sign in"}
        </Link>

        <Link to="/cart">
          Cart
          <span className="cartCount">{cart.length}</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
