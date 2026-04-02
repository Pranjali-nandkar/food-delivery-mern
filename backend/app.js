const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const nocache = require("nocache");

const userRoutes = require("./routes/userRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");

const verifyToken = require("./config/jwt").verifyToken;

const app = express();

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(nocache());
app.use(express.static(path.join(__dirname, "public")));

// Public routes (no token required)
app.use("/user", userAuthRoutes);

// JWT middleware (protects routes below)
app.use(verifyToken);

// Protected routes
app.use("/user", userRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/order", orderRoutes);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running ✅" });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
});

module.exports = app;
