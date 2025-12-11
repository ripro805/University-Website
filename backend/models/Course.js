const mongoose = require("mongoose");

/**
 * Course Schema - Academic courses offered
 */
const courseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      uppercase: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true
    },
    department: {
      type: String,
      required: [true, "Department is required"]
    },
    credits: {
      type: Number,
      required: [true, "Credits are required"],
      min: [0, "Credits cannot be negative"]
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    description: String,
    syllabus: String,
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    teacherName: String,
    schedule: [
      {
        day: {
          type: String,
          enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        startTime: String,
        endTime: String,
        room: String
      }
    ],
    totalStudents: {
      type: Number,
      default: 0
    },
    maxCapacity: Number,
    prerequisites: [String],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);
