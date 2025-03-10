const express = require("express");
const router = express.Router();

// Import các routes con
const authRoutes = require("./authRoutes");
const accountRoutes = require("./accountRoutes");
const transactionRoutes = require("./transactionRoutes");
const transferRoutes = require("./transferRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const protectedRoutes = require("./protectedRoutes");
// Sử dụng các route con
router.use("/auth", authRoutes); // Tất cả routes bắt đầu bằng /auth
router.use("/accounts", accountRoutes); // Tất cả routes bắt đầu bằng /accounts
router.use("/transactions", transactionRoutes); // Tất cả routes bắt đầu bằng /transactions
router.use("/transfer", transferRoutes); // Tất cả routes bắt đầu bằng /transfer
router.use("/dashboard", dashboardRoutes);
router.use("/", protectedRoutes);

module.exports = router;