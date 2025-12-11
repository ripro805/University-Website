const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const User = require("../models/User");
const Course = require("../models/Course");

/**
 * @route   GET /api/students/dashboard
 * @desc    Get student dashboard data
 * @access  Private (Student)
 */
router.get("/dashboard", protect, authorize("student"), async (req, res) => {
  try {
    const student = await User.findById(req.user.id);
    const courses = await Course.find({ department: student.department });
    
    res.status(200).json({
      success: true,
      data: {
        student: student.getPublicProfile(),
        courses: courses.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching dashboard"
    });
  }
});

/**
 * @route   GET /api/students/courses
 * @desc    Get student enrolled courses
 * @access  Private (Student)
 */
router.get("/courses", protect, authorize("student"), async (req, res) => {
  try {
    const student = await User.findById(req.user.id);
    const courses = await Course.find({ 
      department: student.department,
      isActive: true
    }).populate("teacher", "profile teacherInfo");
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching courses"
    });
  }
});

module.exports = router;
