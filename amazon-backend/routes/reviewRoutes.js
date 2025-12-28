const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET ALL REVIEWS FOR A PRODUCT
router.get("/:productId", (req, res) => {
    const sql = `
    SELECT r.*, u.email 
    FROM reviews r 
    JOIN users u ON r.user_id = u.id 
    WHERE r.product_id = ? 
    ORDER BY r.created_at DESC
  `;
    db.query(sql, [req.params.productId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// ADD A NEW REVIEW
router.post("/add", (req, res) => {
    const { productId, userId, rating, comment } = req.body;
    const sql = "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)";
    db.query(sql, [productId, userId, rating, comment], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Review added successfully" });
    });
});

module.exports = router;
