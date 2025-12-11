const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

/**
 * @route   GET /api/transport/routes
 * @desc    Get bus routes
 * @access  Public
 */
router.get("/routes", async (req, res) => {
  try {
    // For now, return static data - can be moved to database later
    const routes = [
      { id: 1, name: "Dhaka - Campus", stops: ["Mohakhali", "Banani", "Gulshan"], timing: "7:00 AM" },
      { id: 2, name: "Campus - Dhaka", stops: ["Gulshan", "Banani", "Mohakhali"], timing: "5:00 PM" }
    ];
    
    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching routes"
    });
  }
});

/**
 * @route   GET /api/transport/notices
 * @desc    Get transport notices
 * @access  Public
 */
router.get("/notices", async (req, res) => {
  try {
    const notices = await Notice.find({ 
      category: "transport",
      isActive: true
    }).sort({ publishDate: -1 }).limit(10);
    
    res.status(200).json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching notices"
    });
  }
});

module.exports = router;
