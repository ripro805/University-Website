const mongoose = require("mongoose");

/**
 * BookIssue Schema - Tracks book borrowing and returns
 */
const bookIssueSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    bookName: {
      type: String,
      required: true
    },
    studentId: {
      type: String,
      required: [true, "Student ID is required"]
    },
    studentName: {
      type: String,
      required: [true, "Student name is required"]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    issueDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    dueDate: {
      type: Date,
      required: true
    },
    returnDate: {
      type: Date,
      default: null
    },
    fine: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: ["issued", "overdue", "returned"],
      default: "issued"
    }
  },
  {
    timestamps: true
  }
);

// Calculate fine automatically (5 Taka per day)
bookIssueSchema.methods.calculateFine = function () {
  if (this.returnDate || this.status === "returned") {
    const returnDate = this.returnDate || new Date();
    const diffTime = returnDate - this.dueDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * 5 : 0;
  }
  return 0;
};

module.exports = mongoose.model("BookIssue", bookIssueSchema);
