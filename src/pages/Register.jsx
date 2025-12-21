import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  return (
    <div className="auth">
      <h2>Create Account</h2>

      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Create Account</button>
      </form>

      <p>
        Already have an account?
        <Link to="/login"> Sign in</Link>
      </p>
    </div>
  );
}

export default Register;
