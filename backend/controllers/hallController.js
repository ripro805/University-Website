const Hall = require("../models/Hall");
const Room = require("../models/Room");

/**
 * @route   GET /api/halls
 * @desc    Get all halls
 * @access  Public
 */
exports.getHalls = async (req, res) => {
  try {
    const halls = await Hall.find({ isActive: true }).sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: halls.length,
      data: halls
    });
  } catch (error) {
    console.error("Get halls error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching halls"
    });
  }
};

/**
 * @route   GET /api/halls/:slug
 * @desc    Get hall by slug
 * @access  Public
 */
exports.getHallBySlug = async (req, res) => {
  try {
    const hall = await Hall.findOne({ slug: req.params.slug, isActive: true });
    
    if (!hall) {
      return res.status(404).json({
        success: false,
        error: "Hall not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: hall
    });
  } catch (error) {
    console.error("Get hall error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching hall"
    });
  }
};

/**
 * @route   POST /api/halls
 * @desc    Create new hall
 * @access  Private (Hall Admin)
 */
exports.createHall = async (req, res) => {
  try {
    const hall = await Hall.create(req.body);
    
    res.status(201).json({
      success: true,
      message: "Hall created successfully",
      data: hall
    });
  } catch (error) {
    console.error("Create hall error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error creating hall"
    });
  }
};

/**
 * @route   PUT /api/halls/:id
 * @desc    Update hall
 * @access  Private (Hall Admin)
 */
exports.updateHall = async (req, res) => {
  try {
    const hall = await Hall.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!hall) {
      return res.status(404).json({
        success: false,
        error: "Hall not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Hall updated successfully",
      data: hall
    });
  } catch (error) {
    console.error("Update hall error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error updating hall"
    });
  }
};

/**
 * @route   DELETE /api/halls/:id
 * @desc    Delete hall
 * @access  Private (Hall Admin)
 */
exports.deleteHall = async (req, res) => {
  try {
    const hall = await Hall.findByIdAndDelete(req.params.id);
    
    if (!hall) {
      return res.status(404).json({
        success: false,
        error: "Hall not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Hall deleted successfully"
    });
  } catch (error) {
    console.error("Delete hall error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error deleting hall"
    });
  }
};

/**
 * @route   GET /api/halls/:hallId/rooms
 * @desc    Get rooms in a hall
 * @access  Private (Hall Admin)
 */
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ hallId: req.params.hallId, isActive: true })
      .populate("hallId", "name")
      .sort({ floor: 1, roomNumber: 1 });
    
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    console.error("Get rooms error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching rooms"
    });
  }
};

/**
 * @route   POST /api/halls/:hallId/rooms
 * @desc    Add room to hall
 * @access  Private (Hall Admin)
 */
exports.addRoom = async (req, res) => {
  try {
    const roomData = {
      ...req.body,
      hallId: req.params.hallId
    };
    
    const room = await Room.create(roomData);
    
    // Update hall's total rooms
    await Hall.findByIdAndUpdate(
      req.params.hallId,
      { $inc: { totalRooms: 1, capacity: room.capacity } }
    );
    
    res.status(201).json({
      success: true,
      message: "Room added successfully",
      data: room
    });
  } catch (error) {
    console.error("Add room error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error adding room"
    });
  }
};
