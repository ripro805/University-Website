const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

/**
 * @route   GET /api/sports/schedule
 * @desc    Get sports schedule
 * @access  Public
 */
router.get("/schedule", async (req, res) => {
  try {
    // For now, return static data - can be moved to database later
    const schedule = [
      { id: 1, sport: "Football", day: "Monday", time: "4:00 PM", venue: "Main Ground" },
      { id: 2, sport: "Cricket", day: "Wednesday", time: "4:00 PM", venue: "Cricket Ground" },
      { id: 3, sport: "Basketball", day: "Friday", time: "5:00 PM", venue: "Indoor Court" }
    ];
    
    res.status(200).json({
      success: true,
      count: schedule.length,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching schedule"
    });
  }
});

/**
 * @route   GET /api/sports/notices
 * @desc    Get sports notices
 * @access  Public
 */
router.get("/notices", async (req, res) => {
  try {
    const notices = await Notice.find({ 
      category: "sports",
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
