const mongoose = require("mongoose");

/**
 * Room Schema - Manages hall rooms
 */
const roomSchema = new mongoose.Schema(
  {
    hallId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hall",
      required: true
    },
    roomNumber: {
      type: String,
      required: [true, "Room number is required"]
    },
    floor: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: [true, "Room capacity is required"],
      min: 1
    },
    occupiedSeats: {
      type: Number,
      default: 0,
      min: 0
    },
    roomType: {
      type: String,
      enum: ["single", "double", "triple", "quad", "five-seat", "general"],
      required: true
    },
    facilities: [String],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index for unique room number per hall
roomSchema.index({ hallId: 1, roomNumber: 1 }, { unique: true });

module.exports = mongoose.model("Room", roomSchema);
