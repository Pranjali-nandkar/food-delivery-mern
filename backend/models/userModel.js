const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  address: { type: String },
  user_type: { type: Number, default: 0 }, // 0: Customer, 1: Restaurant Owner, 2: Admin
  balance: { type: Number, default: 0 },
});

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Static methods to match existing API
userSchema.statics.add = async function (fname, lname, email, password, user_type, address) {
  const user = new this({ fname, lname, email, password, user_type, address });
  return await user.save();
};

userSchema.statics.getByEmail = async function (email) {
  return await this.findOne({ email });
};

userSchema.statics.getById = async function (userId) {
  return await this.findById(userId);
};

userSchema.statics.updateUserById = async function (userId, updatedData) {
  return await this.findByIdAndUpdate(userId, updatedData, { new: true });
};

module.exports = mongoose.model("User", userSchema);
