const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET ALL PRODUCTS
router.get("/", (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err.message);
            return res.status(500).json({ error: "Failed to fetch products" });
        }
        res.json(results);
    });
});

module.exports = router;
