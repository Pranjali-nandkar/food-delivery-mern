const express = require("express");
const router = express.Router();
const jwt = require("../config/jwt");
const orderController = require("../controllers/orderController");

router.get("/", jwt.verifyToken, orderController.getOrders);

module.exports = router;
