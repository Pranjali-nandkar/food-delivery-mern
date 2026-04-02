require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");
const app = express();
const port = 5000;

// ✅ Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000', 'http://localhost:5001', 'http://localhost:8082', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:5000', 'http://127.0.0.1:5001', 'http://127.0.0.1:8082'],
  credentials: true
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Mount auth routes (login/register)
const userAuthRoutes = require('./routes/userAuthRoutes');
app.use('/api/auth', userAuthRoutes);

// ✅ (Optional) Mount user profile routes (if needed)
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

// ✅ (Optional) Mount restaurant and order routes
const restaurantRoutes = require('./routes/restaurantRoutes');
app.use('/api/restaurants', restaurantRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use("/api/orders", orderRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// ✅ Sample base route
app.get('/', (req, res) => {
  res.send('Food Delivery Backend');
});

const startServer = async () => {
  try {
    // ✅ Connect to MongoDB
    await connectDB();

    // ✅ Start server
    app.listen(port, "0.0.0.0", () => {
      console.log(`✅ Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
