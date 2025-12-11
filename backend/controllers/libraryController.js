const Book = require("../models/Book");
const BookIssue = require("../models/BookIssue");
const User = require("../models/User");

/**
 * @route   GET /api/library/books
 * @desc    Get all books with optional filtering and pagination
 * @access  Public
 */
exports.getBooks = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 100 } = req.query;
    
    let query = {};
    
    // Search by name, author, or ISBN
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } }
      ];
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    const books = await Book.find(query)
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Book.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: books.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: books
    });
  } catch (error) {
    console.error("Get books error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching books"
    });
  }
};

/**
 * @route   GET /api/library/books/:id
 * @desc    Get single book by ID
 * @access  Public
 */
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error("Get book error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching book"
    });
  }
};

/**
 * @route   POST /api/library/books
 * @desc    Add new book (Admin only)
 * @access  Private (Library role)
 */
exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    
    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book
    });
  } catch (error) {
    console.error("Add book error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error adding book"
    });
  }
};

/**
 * @route   PUT /api/library/books/:id
 * @desc    Update book (Admin only)
 * @access  Private (Library role)
 */
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book
    });
  } catch (error) {
    console.error("Update book error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error updating book"
    });
  }
};

/**
 * @route   DELETE /api/library/books/:id
 * @desc    Delete book (Admin only)
 * @access  Private (Library role)
 */
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (error) {
    console.error("Delete book error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error deleting book"
    });
  }
};

/**
 * @route   POST /api/library/issue
 * @desc    Issue a book to a student
 * @access  Private (Library role)
 */
exports.issueBook = async (req, res) => {
  try {
    const { bookId, studentId, studentName } = req.body;
    
    // Find book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found"
      });
    }
    
    // Check availability
    if (book.available <= 0) {
      return res.status(400).json({
        success: false,
        error: "Book not available"
      });
    }
    
    // Find user
    const user = await User.findOne({ userId: studentId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    
    // Check if user is blocked
    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        error: "User is blocked"
      });
    }
    
    // Calculate due date (14 days from now)
    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    
    // Create issue record
    const bookIssue = await BookIssue.create({
      bookId: book._id,
      bookName: book.name,
      studentId,
      studentName: user.profile?.fullName || studentName,
      userId: user._id,
      issueDate,
      dueDate,
      status: "issued"
    });
    
    // Update book availability
    book.available -= 1;
    await book.save();
    
    res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: bookIssue
    });
  } catch (error) {
    console.error("Issue book error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error issuing book"
    });
  }
};

/**
 * @route   POST /api/library/return/:issueId
 * @desc    Return a book
 * @access  Private (Library role)
 */
exports.returnBook = async (req, res) => {
  try {
    const bookIssue = await BookIssue.findById(req.params.issueId);
    
    if (!bookIssue) {
      return res.status(404).json({
        success: false,
        error: "Issue record not found"
      });
    }
    
    if (bookIssue.status === "returned") {
      return res.status(400).json({
        success: false,
        error: "Book already returned"
      });
    }
    
    // Calculate fine
    const returnDate = new Date();
    bookIssue.returnDate = returnDate;
    bookIssue.fine = bookIssue.calculateFine();
    bookIssue.status = "returned";
    await bookIssue.save();
    
    // Update book availability
    const book = await Book.findById(bookIssue.bookId);
    if (book) {
      book.available += 1;
      await book.save();
    }
    
    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      fine: bookIssue.fine,
      data: bookIssue
    });
  } catch (error) {
    console.error("Return book error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error returning book"
    });
  }
};

/**
 * @route   GET /api/library/issues
 * @desc    Get all book issues with optional filtering
 * @access  Private (Library role)
 */
exports.getBookIssues = async (req, res) => {
  try {
    const { status, studentId } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (studentId) query.studentId = studentId;
    
    const issues = await BookIssue.find(query)
      .populate("bookId")
      .populate("userId", "profile email")
      .sort({ issueDate: -1 });
    
    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues
    });
  } catch (error) {
    console.error("Get issues error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching issues"
    });
  }
};

/**
 * @route   GET /api/library/stats
 * @desc    Get library statistics
 * @access  Private (Library role)
 */
exports.getLibraryStats = async (req, res) => {
  try {
    const totalBooks = await Book.aggregate([
      { $group: { _id: null, total: { $sum: "$quantity" }, available: { $sum: "$available" } } }
    ]);
    
    const issuedBooks = await BookIssue.countDocuments({ status: { $in: ["issued", "overdue"] } });
    const overdueBooks = await BookIssue.countDocuments({ status: "overdue" });
    
    const totalUsers = await User.countDocuments({ role: "student", isActive: true });
    const blockedUsers = await User.countDocuments({ role: "student", isActive: false });
    
    res.status(200).json({
      success: true,
      data: {
        totalBooks: totalBooks[0]?.total || 0,
        availableBooks: totalBooks[0]?.available || 0,
        issuedBooks,
        overdueBooks,
        totalUsers,
        blockedUsers
      }
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching statistics"
    });
  }
};
