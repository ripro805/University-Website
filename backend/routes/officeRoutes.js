const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const User = require("../models/User");
const Notice = require("../models/Notice");

/**
 * @route   GET /api/offices/staffs
 * @desc    Get office staff members
 * @access  Private (Employee)
 */
router.get("/staffs", protect, authorize("employee"), async (req, res) => {
  try {
    const { department } = req.user;
    const staffs = await User.find({ 
      role: "employee",
      department,
      isActive: true
    }).select("userId profile employeeInfo");
    
    res.status(200).json({
      success: true,
      count: staffs.length,
      data: staffs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching staff members"
    });
  }
});

/**
 * @route   GET /api/offices/notices
 * @desc    Get office notices
 * @access  Private (Employee)
 */
router.get("/notices", protect, authorize("employee"), async (req, res) => {
  try {
    const { department } = req.user;
    const notices = await Notice.find({ 
      category: "general",
      department,
      isActive: true
    }).sort({ publishDate: -1 }).limit(20);
    
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
