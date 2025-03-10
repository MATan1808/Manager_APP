// const express = require("express");
// const router = express.Router();
// const { connectDB, sql, config } = require("../connectDB"); // Import kết nối SQL Server

// // API chuyển khoản
// router.post("/transfer", async(req, res) => {
//     const { sender_id, receiver_id, amount } = req.body;

//     if (!sender_id || !receiver_id || !amount) {
//         return res.status(400).json({ error: "Thiếu thông tin chuyển khoản!" });
//     }

//     try {
//         // Kết nối SQL Server
//         const pool = await sql.connect(config);

//         // 1. Lấy thông tin người gửi
//         const senderResult = await pool
//             .request()
//             .input("sender_id", sql.Int, sender_id)
//             .query("SELECT account_number, balance FROM accounts WHERE id = @sender_id");

//         if (senderResult.recordset.length === 0) {
//             return res.status(404).json({ error: "Người gửi không tồn tại!" });
//         }

//         const senderAccount = senderResult.recordset[0].account_number;
//         const senderBalance = senderResult.recordset[0].balance;

//         // 2. Lấy thông tin người nhận
//         const receiverResult = await pool
//             .request()
//             .input("receiver_id", sql.Int, receiver_id)
//             .query("SELECT account_number FROM accounts WHERE id = @receiver_id");

//         if (receiverResult.recordset.length === 0) {
//             return res.status(404).json({ error: "Người nhận không tồn tại!" });
//         }

//         const receiverAccount = receiverResult.recordset[0].account_number;

//         // 3. Kiểm tra số dư tài khoản người gửi
//         if (senderBalance < amount) {
//             return res.status(400).json({ error: "Số dư không đủ!" });
//         }

//         // 4. Bắt đầu giao dịch
//         const transaction = pool.transaction();
//         await transaction.begin();

//         // Trừ tiền người gửi
//         await transaction
//             .request()
//             .input("amount", sql.Decimal, amount)
//             .input("sender_id", sql.Int, sender_id)
//             .query("UPDATE accounts SET balance = balance - @amount WHERE id = @sender_id");

//         // Cộng tiền người nhận
//         await transaction
//             .request()
//             .input("amount", sql.Decimal, amount)
//             .input("receiver_id", sql.Int, receiver_id)
//             .query("UPDATE accounts SET balance = balance + @amount WHERE id = @receiver_id");

//         // Lưu lịch sử giao dịch
//         const timestamp = new Date().toISOString();
//         await transaction
//             .request()
//             .input("sender_id", sql.Int, sender_id)
//             .input("sender_account", sql.VarChar, senderAccount)
//             .input("receiver_id", sql.Int, receiver_id)
//             .input("receiver_account", sql.VarChar, receiverAccount)
//             .input("amount", sql.Decimal, amount)
//             .input("status", sql.VarChar, "success")
//             .input("timestamp", sql.DateTime, timestamp)
//             .query(`
//                 INSERT INTO transactions (sender_id, sender_account, receiver_id, receiver_account, amount, status, timestamp)
//                 VALUES (@sender_id, @sender_account, @receiver_id, @receiver_account, @amount, @status, @timestamp)
//             `);

//         // Commit giao dịch
//         await transaction.commit();

//         // Trả về kết quả
//         res.status(200).json({
//             message: "Chuyển khoản thành công!",
//             transaction: {
//                 sender_id,
//                 sender_account: senderAccount,
//                 receiver_id,
//                 receiver_account: receiverAccount,
//                 amount,
//                 status: "success",
//                 timestamp
//             }
//         });

//     } catch (error) {
//         console.error("❌ Lỗi xử lý giao dịch:", error);
//         res.status(500).json({ error: "Lỗi xử lý giao dịch!" });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const transferController = require("../controllers/transferController");
const validateTransfer = require("../middleware/validateTransfer");

// Endpoint POST /transfer
router.post("/", validateTransfer, transferController.transferMoney);

module.exports = router;