const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { connectDB } = require("./config/db");

const analyticsRoutes = require("./routes/analyticsRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Create Express app
const app = express();

// Middleware
app.use(
cors({
origin: "*",
credentials: true,
})
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic logger middleware
app.use((req, res, next) => {
console.log(
`[${new Date().toISOString()}] ${req.method} ${req.url}`
);
next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/repos", require("./routes/repoRoutes"));
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);

// Root Route
app.get("/", (req, res) => {
res.json({
success: true,
message:
"Welcome to DevTrackr – AI Developer Productivity Dashboard API",
});
});

// Error Handler
app.use((err, req, res, next) => {
console.error("Unhandled Error:", err);

res.status(err.status || 500).json({
success: false,
message: err.message || "Internal Server Error",
});
});

// Start Server
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
console.log(
`Server running on port ${PORT} in development mode`
);
});

