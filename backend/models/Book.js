const mongoose = require("mongoose");

/**
 * Book Schema - Manages library book catalog
 */
const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Book name is required"],
      trim: true
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Computer Science",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Economics",
        "Business",
        "Literature",
        "History",
        "Biology",
        "Engineering",
        "Medicine",
        "Law",
        "Philosophy",
        "Psychology",
        "Sociology"
      ]
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"]
    },
    available: {
      type: Number,
      required: [true, "Available quantity is required"],
      min: [0, "Available quantity cannot be negative"]
    },
    publisher: String,
    publicationYear: Number,
    edition: String,
    language: {
      type: String,
      default: "English"
    },
    pages: Number,
    description: String,
    shelfLocation: String,
    coverImage: String
  },
  {
    timestamps: true
  }
);

// Index for faster search
bookSchema.index({ name: "text", author: "text", isbn: "text" });

module.exports = mongoose.model("Book", bookSchema);
