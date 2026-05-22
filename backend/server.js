const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const analyticsRoutes = require("./routes/analyticsRoutes");

require("dotenv").config();
// Load environment variables
dotenv.config();

// Create Express app
const app = express();

app.use("/api/analytics", analyticsRoutes);

// Middleware
app.use(cors({
  origin: '*', // For development, allow all origins
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/repos', require('./routes/repoRoutes'));

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to DevTrackr – AI Developer Productivity Dashboard API'
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect database
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
};

startServer();
