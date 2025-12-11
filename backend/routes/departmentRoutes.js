const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

/**
 * @route   GET /api/departments
 * @desc    Get all departments
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true }).sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching departments"
    });
  }
});

/**
 * @route   GET /api/departments/:slug
 * @desc    Get department by slug
 * @access  Public
 */
router.get("/:slug", async (req, res) => {
  try {
    const department = await Department.findOne({ 
      slug: req.params.slug,
      isActive: true
    });
    
    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching department"
    });
  }
});

module.exports = router;
