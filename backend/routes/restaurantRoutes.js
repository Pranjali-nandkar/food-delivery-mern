const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const jwt = require("../config/jwt");

// Public
router.get("/", restaurantController.restaurantList);

// Protected
router.get("/orders", jwt.verifyToken, restaurantController.getOrders);
router.post("/add", jwt.verifyToken, restaurantController.restaurantAdd);
// router.get("/page/:page", jwt.verifyToken, restaurantController.restaurantByPage); // Removed as it was SQL specific
router.get("/me", jwt.verifyToken, restaurantController.restaurantGetByUserId);
router.put("/update", jwt.verifyToken, restaurantController.restaurantUpdate);
router.delete("/delete", jwt.verifyToken, restaurantController.restaurantDelete);
router.get("/count", jwt.verifyToken, restaurantController.restaurantCount);
router.get("/:id/menu", restaurantController.restaurantMenu);

// ✅ This is the key route for placing orders
router.post("/:restaurant_id/order", jwt.verifyToken, restaurantController.addOrder);

module.exports = router;
