const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authenticateToken = require("../middleware/authenticateToken"); // Import middleware xác thực

// Endpoint GET /api/dashboard
router.get("/", authenticateToken, dashboardController.getDashboardData);

module.exports = router;