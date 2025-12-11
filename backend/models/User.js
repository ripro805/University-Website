const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * User Schema - Handles all user types (student, teacher, library, employee, hall-admin)
 * This unified model allows for flexible role-based authentication
 */
const userSchema = new mongoose.Schema(
  {
    // Common fields for all users
    userId: {
      type: String,
      required: [true, "User ID is required"],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false // Don't return password by default in queries
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["student", "teacher", "library", "employee", "hall-admin"],
      default: "student"
    },
    
    // Role-specific fields
    department: {
      type: String,
      trim: true
    },
    
    // Student-specific fields
    studentInfo: {
      studentId: String,
      batch: String,
      semester: String,
      cgpa: Number,
      credits: Number
    },
    
    // Teacher-specific fields
    teacherInfo: {
      teacherId: String,
      designation: String,
      specialization: String,
      officeRoom: String,
      phone: String,
      joiningDate: Date
    },
    
    // Employee-specific fields
    employeeInfo: {
      employeeId: String,
      position: String,
      office: String
    },
    
    // Profile information
    profile: {
      fullName: String,
      phone: String,
      address: String,
      dateOfBirth: Date,
      gender: String,
      bloodGroup: String,
      photo: String
    },
    
    // Status and metadata
    isActive: {
      type: Boolean,
      default: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    lastLogin: Date
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash if password is modified
  if (!this.isModified("password")) {
    return next();
  }
  
  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);
