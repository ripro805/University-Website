const mongoose = require("mongoose");

/**
 * Department Schema - Academic departments
 */
const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    description: String,
    establishedYear: Number,
    head: {
      name: String,
      email: String,
      phone: String,
      photo: String
    },
    faculty: String,
    programs: [
      {
        name: String,
        degree: {
          type: String,
          enum: ["BSc", "MSc", "PhD", "Diploma"]
        },
        duration: String
      }
    ],
    totalStudents: {
      type: Number,
      default: 0
    },
    totalTeachers: {
      type: Number,
      default: 0
    },
    facilities: [String],
    image: String,
    contactEmail: String,
    contactPhone: String,
    location: String,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Department", departmentSchema);
