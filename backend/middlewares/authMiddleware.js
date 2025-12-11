const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware to protect routes - Verify JWT token
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Not authorized. Please login."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");

    // Get user from token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User no longer exists"
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: "Your account has been deactivated"
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      error: "Not authorized. Token invalid or expired."
    });
  }
};

/**
 * Middleware to authorize specific roles
 * @param  {...any} roles - Allowed roles (e.g., "student", "teacher", "admin")
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};
