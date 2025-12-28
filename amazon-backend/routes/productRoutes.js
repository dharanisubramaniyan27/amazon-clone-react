const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET ALL PRODUCTS (Using Stored Procedure)
router.get("/", (req, res) => {
    const sql = "CALL GetProducts()";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err.message);
            return res.status(500).json({ error: "Failed to fetch products" });
        }
        // results is an array of arrays when calling procedures
        res.json(results[0]);
    });
});

module.exports = router;
