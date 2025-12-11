const mongoose = require("mongoose");

/**
 * Notice Schema - System-wide notices and announcements
 */
const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true
    },
    content: {
      type: String,
      required: [true, "Notice content is required"]
    },
    type: {
      type: String,
      enum: ["announcement", "holiday", "event", "reminder", "academic", "exam", "general"],
      default: "general"
    },
    category: {
      type: String,
      enum: ["library", "hall", "department", "transport", "sports", "general"],
      default: "general"
    },
    targetAudience: {
      type: [String],
      enum: ["all", "student", "teacher", "employee", "library", "hall-admin"],
      default: ["all"]
    },
    important: {
      type: Boolean,
      default: false
    },
    department: String,
    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    publishDate: {
      type: Date,
      default: Date.now
    },
    expiryDate: Date,
    attachments: [
      {
        filename: String,
        url: String,
        fileType: String
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
noticeSchema.index({ publishDate: -1, important: -1 });

module.exports = mongoose.model("Notice", noticeSchema);
