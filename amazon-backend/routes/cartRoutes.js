const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ADD TO CART
router.post("/add", (req, res) => {
  const { userId, productId, qty } = req.body;
  console.log("Add to cart attempt:", { userId, productId, qty });

  const sql = `
    INSERT INTO cart (user_id, product_id, qty)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE qty = qty + ?
  `;

  db.query(sql, [userId, productId, qty, qty], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item added to cart" });
  });
});

// GET CART
router.get("/:userId", (req, res) => {
  const sql = `
    SELECT c.id as cart_item_id, c.product_id as id, c.qty, p.title, p.price, p.image
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [req.params.userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// REMOVE ONE QTY OR DELETE IF LAST
router.put("/remove", (req, res) => {
  const { userId, productId } = req.body;

  // First check current quantity
  const checkSql = "SELECT qty FROM cart WHERE user_id = ? AND product_id = ?";
  db.query(checkSql, [userId, productId], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0 && results[0].qty > 1) {
      // Decrement
      const updateSql = "UPDATE cart SET qty = qty - 1 WHERE user_id = ? AND product_id = ?";
      db.query(updateSql, [userId, productId], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Quantity reduced" });
      });
    } else {
      // Delete
      const deleteSql = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
      db.query(deleteSql, [userId, productId], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item removed from cart" });
      });
    }
  });
});

// CHECKOUT (DUMMY PAYMENT)
router.post("/checkout", (req, res) => {
  const { userId, total } = req.body;

  // 1. Create an order
  const orderSql = "INSERT INTO orders (user_id, total) VALUES (?, ?)";
  db.query(orderSql, [userId, total], (err, result) => {
    if (err) return res.status(500).json(err);

    // 2. Clear the cart for this user
    const clearCartSql = "DELETE FROM cart WHERE user_id = ?";
    db.query(clearCartSql, [userId], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Checkout successful", orderId: result.insertId });
    });
  });
});

module.exports = router;
