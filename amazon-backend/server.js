require('dotenv').config();
const express = require("express");
const cors = require("cors");

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("UNHANDLED REJECTION:", reason);
});

const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
let productRoutes;
try {
  productRoutes = require("./routes/productRoutes");
} catch (e) {
  productRoutes = null;
}

const app = express();

app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

console.log('cartRoutes type:', typeof cartRoutes);
console.log('authRoutes type:', typeof authRoutes);
console.log('productRoutes type:', productRoutes ? typeof productRoutes : 'null');

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
if (productRoutes && typeof productRoutes === 'function') app.use("/api/products", productRoutes);

// 404 handler
app.use((req, res) => {
  console.log('404 for:', req.method, req.path);
  res.status(404).json({ error: "Route not found", path: req.path });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Keep process alive for debugging
setInterval(() => { }, 10000);
