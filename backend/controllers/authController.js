const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * Generate JWT Token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "your_jwt_secret_key", {
    expiresIn: process.env.JWT_EXPIRE || "7d"
  });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
exports.register = async (req, res) => {
  try {
    const { userId, email, password, role, department, profile } = req.body;

    // Validation
    if (!userId || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        error: "Please provide userId, email, password, and role"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ userId }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User with this ID or email already exists"
      });
    }

    // Create user based on role
    const userData = {
      userId,
      email,
      password,
      role,
      department,
      profile
    };

    // Add role-specific information
    if (role === "student") {
      userData.studentInfo = {
        studentId: userId,
        batch: req.body.batch,
        semester: req.body.semester
      };
    } else if (role === "teacher") {
      userData.teacherInfo = {
        teacherId: userId,
        designation: req.body.designation,
        specialization: req.body.specialization
      };
    } else if (role === "employee") {
      userData.employeeInfo = {
        employeeId: userId,
        position: req.body.position,
        office: department
      };
    }

    const user = await User.create(userData);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: user.getPublicProfile(),
        token
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error registering user"
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const { userId, password, role } = req.body;

    // Validation
    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide userId and password"
      });
    }

    // Find user with password field (normally hidden)
    const user = await User.findOne({ userId }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    // Check if role matches (if provided)
    if (role && user.role !== role) {
      return res.status(401).json({
        success: false,
        error: "Invalid role for this user"
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: "Account is deactivated. Please contact admin."
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: user.getPublicProfile(),
        token
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error logging in"
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user.getPublicProfile()
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching profile"
    });
  }
};

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    
    // Don't allow updating sensitive fields directly
    delete updates.password;
    delete updates.role;
    delete updates.userId;
    delete updates.email;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user.getPublicProfile()
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error updating profile"
    });
  }
};

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Please provide current and new password"
      });
    }

    const user = await User.findById(req.user.id).select("+password");

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Current password is incorrect"
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error changing password"
    });
  }
};
