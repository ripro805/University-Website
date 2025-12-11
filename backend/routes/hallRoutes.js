const express = require("express");
const router = express.Router();
const {
  getHalls,
  getHallBySlug,
  createHall,
  updateHall,
  deleteHall,
  getRooms,
  addRoom
} = require("../controllers/hallController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * Public routes
 */
router.get("/", getHalls);
router.get("/:slug", getHallBySlug);

/**
 * Protected routes - Hall Admin only
 */
router.post("/", protect, authorize("hall-admin"), createHall);
router.put("/:id", protect, authorize("hall-admin"), updateHall);
router.delete("/:id", protect, authorize("hall-admin"), deleteHall);

router.get("/:hallId/rooms", protect, authorize("hall-admin"), getRooms);
router.post("/:hallId/rooms", protect, authorize("hall-admin"), addRoom);

module.exports = router;
