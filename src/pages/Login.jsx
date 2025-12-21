import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  return (
    <div className="auth">
      <h2>Sign-In</h2>

      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign In</button>
      </form>

      <p>
        New to Amazon?
        <Link to="/register"> Create your account</Link>
      </p>
    </div>
  );
}

export default Login;
