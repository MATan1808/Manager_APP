const express = require("express");
const router = express.Router();
const { getAccounts, getBalance, depositMoney, createTransaction } = require("../controllers/accountController");


// Định nghĩa API cho tài khoản
router.get("/", getAccounts); // Lấy danh sách tài khoản
router.get("/balance/:user_id", getBalance); // Lấy số dư theo `user_id`
router.post("/deposit", depositMoney); // Nạp tiền vào tài khoản
router.post("/create", createTransaction); // Tạo giao dịch
console.log("getAccounts:", getAccounts);
console.log("getBalance:", getBalance);
console.log("depositMoney:", depositMoney);
console.log("createTransaction:", createTransaction);

module.exports = router;