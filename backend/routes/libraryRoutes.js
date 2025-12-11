const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  issueBook,
  returnBook,
  getBookIssues,
  getLibraryStats
} = require("../controllers/libraryController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * Public routes
 */
router.get("/books", getBooks);
router.get("/books/:id", getBook);

/**
 * Protected routes - Library admin only
 */
router.post("/books", protect, authorize("library"), addBook);
router.put("/books/:id", protect, authorize("library"), updateBook);
router.delete("/books/:id", protect, authorize("library"), deleteBook);

router.post("/issue", protect, authorize("library"), issueBook);
router.post("/return/:issueId", protect, authorize("library"), returnBook);
router.get("/issues", protect, authorize("library"), getBookIssues);
router.get("/stats", protect, authorize("library"), getLibraryStats);

module.exports = router;
