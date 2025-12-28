require('dotenv').config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Root@123",
  database: process.env.DB_NAME || "amazon_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err.message);
    return;
  }
  console.log("Connected to MySQL database 'amazon_db'");
});

module.exports = db;
