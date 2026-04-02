const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require("../config/jwt");
const { registrationValidation, loginValidation } = require("../middleware/userValidation");
const { handleValidationErrors } = require("../middleware/validation");

router.post("/login", loginValidation, handleValidationErrors, userController.userLogin);
router.post("/register", registrationValidation, handleValidationErrors, userController.userRegister);

router.get("/", jwt.verifyToken, userController.userProfile);
router.put("/", jwt.verifyToken, userController.updateUserProfile);
router.put("/balance", jwt.verifyToken, userController.updateBalance);
router.delete("/", jwt.verifyToken, userController.deleteProfile);

module.exports = router;
