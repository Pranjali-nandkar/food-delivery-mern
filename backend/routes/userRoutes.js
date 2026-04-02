const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require("../config/jwt");

router.post('/login', userController.userLogin);
router.post('/register', userController.userRegister);
router.get("/", jwt.verifyToken, userController.userProfile);           // get profile
router.put("/", jwt.verifyToken, userController.updateUserProfile);    // update profile
router.put("/balance", jwt.verifyToken, userController.updateBalance); // update balance
router.delete("/", jwt.verifyToken, userController.deleteProfile);     // delete profile

module.exports = router;