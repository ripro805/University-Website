const mongoose = require("mongoose");

/**
 * Hall Schema - Manages student residential halls
 */
const hallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hall name is required"],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    type: {
      type: String,
      enum: ["male", "female", "mixed"],
      required: true
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [0, "Capacity cannot be negative"]
    },
    occupiedSeats: {
      type: Number,
      default: 0,
      min: 0
    },
    provost: {
      name: String,
      phone: String,
      email: String,
      photo: String
    },
    location: String,
    description: String,
    facilities: [String],
    image: String,
    totalRooms: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Virtual for available seats
hallSchema.virtual("availableSeats").get(function () {
  return this.capacity - this.occupiedSeats;
});

module.exports = mongoose.model("Hall", hallSchema);
