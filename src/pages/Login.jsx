import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      <Link to="/">
        <h1 className="login__logo">Amazon</h1>
      </Link>

      <div className="login__container">
        <h2>Sign-In</h2>

        <form>
          <h5>E-mail</h5>
          <input type="email" />

          <h5>Password</h5>
          <input type="password" />

          <button className="login__signInButton">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to Amazon's Conditions of Use & Sale.
        </p>

        <Link to="/register">
          <button className="login__registerButton">
            Create your Amazon Account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
