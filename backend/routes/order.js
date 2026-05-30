const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

const router = express.Router();

// 🟢 CREATE ORDER (PROTECTED)
router.post("/", auth, async (req, res) => {
  try {
    const order = new Order({
      userId: req.user.id, // 🔐 from token
      products: req.body.products,
      total: req.body.total,
      status: "Pending"
    });

    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 GET USER ORDERS ONLY
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;