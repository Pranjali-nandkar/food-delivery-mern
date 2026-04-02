const User = require("../models/userModel");
const emailvalidator = require("email-validator");
const jwt = require("../config/jwt");
require("dotenv").config();

const userRegister = async (req, res) => {
  const { fname, lname, email, password, user_type, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({ fname, lname, email, password, user_type: user_type || 0, address });
    await user.save();

    return res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Error occurred during registration." });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found. Please register first." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.generateToken(user._id.toString(), user.user_type);
    return res.status(200).json({ message: "Login successful", token, user_id: user._id, user_type: user.user_type });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "No user data was found for that user id" });
    }
    const userObj = user.toObject();
    userObj.user_id = userObj._id;
    res.json(userObj);
  } catch (err) {
    console.error("❌ Profile error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.userId);
    if (result) {
      return res.json({ message: "User deleted" });
    } else {
      return res.status(400).json({ message: "Unable to delete user" });
    }
  } catch (err) {
    console.error("❌ Delete profile error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.userId;
  const { fname, lname, address } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { fname, lname, address }, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("❌ Update profile error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const updateBalance = async (req, res) => {
  const { amount } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.balance += parseFloat(amount);
    await user.save();
    res.json({ message: "Balance updated successfully", balance: user.balance });
  } catch (err) {
    console.error("❌ Update balance error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  userProfile,
  deleteProfile,
  updateUserProfile,
  updateBalance,
};
