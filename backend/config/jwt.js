const jwt = require("jsonwebtoken");
require("dotenv").config();

// Check if the secret exists
if (!process.env.SECRET_TOKEN) {
  throw new Error("SECRET_TOKEN is not defined in the .env file");
}

// Function to generate a token
function generateToken(user_id, user_type) {
  return jwt.sign(
    { userId: user_id, userType: user_type },
    process.env.SECRET_TOKEN, // ✅ safe now
    { expiresIn: "1800s" } // 30 minutes
  );
}

// Middleware to verify the token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("Token verification error:", err.message);
    return res.sendStatus(403);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
