const express = require("express");
const { getAccounts, getBalance, depositMoney, createTransaction } = require("../controllers/accountController");
const router = express.Router();

router.get("/", getAccounts); // Lấy danh sách tài khoản
router.get("/balance/:user_id", getBalance); // Lấy số dư tài khoản theo `user_id`
router.post("/deposit", depositMoney); // Nạp tiền vào tài khoản (PHẢI DÙNG POST)
router.post("/create", createTransaction); // 📌 API để tạo giao dịch
module.exports = router;