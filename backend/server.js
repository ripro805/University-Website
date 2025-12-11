const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const hallRoutes = require("./routes/hallRoutes");
const officeRoutes = require("./routes/officeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const transportRoutes = require("./routes/transportRoutes");
const sportsRoutes = require("./routes/sportsRoutes");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Gstu_web";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected to Gstu_web database"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "GSTU University Backend API",
    status: "Running",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      students: "/api/students",
      teachers: "/api/teachers",
      library: "/api/library",
      halls: "/api/halls",
      offices: "/api/offices",
      departments: "/api/departments",
      transport: "/api/transport",
      sports: "/api/sports"
    }
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/halls", hallRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/sports", sportsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
});

module.exports = app;
