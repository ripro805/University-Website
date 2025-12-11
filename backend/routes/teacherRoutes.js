const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const User = require("../models/User");
const Course = require("../models/Course");

/**
 * @route   GET /api/teachers/profile
 * @desc    Get teacher profile
 * @access  Private (Teacher)
 */
router.get("/profile", protect, authorize("teacher"), async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: teacher.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching profile"
    });
  }
});

/**
 * @route   GET /api/teachers/courses
 * @desc    Get courses taught by teacher
 * @access  Private (Teacher)
 */
router.get("/courses", protect, authorize("teacher"), async (req, res) => {
  try {
    const courses = await Course.find({ 
      teacher: req.user.id,
      isActive: true
    });
    
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

/**
 * @route   GET /api/teachers/students
 * @desc    Get students in teacher's courses
 * @access  Private (Teacher)
 */
router.get("/students", protect, authorize("teacher"), async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id);
    const students = await User.find({ 
      role: "student",
      department: teacher.department,
      isActive: true
    }).select("userId profile studentInfo");
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching students"
    });
  }
});

module.exports = router;
