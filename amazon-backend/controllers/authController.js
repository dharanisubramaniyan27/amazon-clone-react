const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hash],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "User registered" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    (err, result) => {
      if (err || result.length === 0)
        return res.status(401).json("Invalid");

      const user = result[0];
      const valid = bcrypt.compareSync(password, user.password);

      if (!valid) return res.status(401).json("Invalid");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "SECRET", {
        expiresIn: "1d",
      });

      console.log("Login successful for:", user.email);
      const responseData = {
        token,
        user: {
          id: user.id,
          email: user.email
        }
      };
      console.log("Sending response:", responseData);
      res.json(responseData);
    }
  );
};
