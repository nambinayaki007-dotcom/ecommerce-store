const express = require("express");
const Product = require("../models/Product");

const { verifyToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 🔐 ONLY ADMIN CAN ADD PRODUCT
router.post("/", verifyToken, isAdmin, async (req, res) => {

  const product = new Product(req.body);
  await product.save();

  res.json(product);
});

module.exports = router;