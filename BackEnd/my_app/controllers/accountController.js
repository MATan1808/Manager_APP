// const { sql } = require("../connectDB");
// const { createTransaction } = require("../controllers/transactionController");

// // Lấy danh sách tài khoản
// const getAccounts = async(req, res) => {
//     try {
//         const result = await sql.query `SELECT * FROM accounts`;
//         res.json({ accounts: result.recordset });
//     } catch (error) {
//         console.error("❌ Lỗi lấy danh sách tài khoản:", error.message);
//         res.status(500).json({ error: `Lỗi lấy danh sách tài khoản: ${error.message}` });
//     }
// };

// // Lấy số dư theo user_id
// const getBalance = async(req, res) => {
//     try {
//         const { user_id } = req.params;
//         console.log("📌 Nhận user_id từ URL:", user_id);

//         if (!user_id) return res.status(400).json({ error: "Thiếu user_id" });

//         // Chuyển `user_id` sang số nguyên
//         const userId = parseInt(user_id, 10);
//         console.log("📌 userId đã chuyển đổi:", userId);

//         if (isNaN(userId)) return res.status(400).json({ error: "user_id không hợp lệ" });

//         const result = await sql.query `
//             SELECT balance FROM accounts WHERE user_id = ${userId}
//         `;

//         console.log("📌 Kết quả truy vấn:", result.recordset);

//         if (result.recordset.length === 0) {
//             return res.status(404).json({ error: "Không tìm thấy tài khoản" });
//         }

//         res.json({ balance: result.recordset[0].balance });
//     } catch (error) {
//         console.error("❌ Lỗi lấy số dư tài khoản:", error.message);
//         res.status(500).json({ error: `Lỗi lấy số dư tài khoản: ${error.message}` });
//     }
// };



// // Nạp tiền vào tài khoản
// const depositMoney = async(req, res) => {
//     try {
//         const { user_id, amount } = req.body; // 📌 Lấy dữ liệu từ `body`, không phải `params`

//         if (!user_id || !amount) {
//             return res.status(400).json({ error: "Thiếu user_id hoặc amount!" });
//         }

//         // Thực hiện truy vấn để cập nhật số dư tài khoản
//         const result = await sql.query(
//             `UPDATE accounts SET balance = balance + ${amount} WHERE user_id = ${user_id}`
//         );

//         if (result.rowsAffected[0] > 0) {
//             res.json({ success: true, message: "Nạp tiền thành công!" });
//         } else {
//             res.status(404).json({ error: "Không tìm thấy tài khoản!" });
//         }
//     } catch (err) {
//         console.error("❌ Lỗi nạp tiền:", err.message);
//         res.status(500).json({ error: "Lỗi server!" });
//     }
// };


// const { createTransaction } = require("../controllers/transactionController");

// // Chuyển tiền giữa hai tài khoản
// const transferMoney = async(req, res) => {
//     try {
//         const { sender_id, receiver_id, amount } = req.body;

//         // Kiểm tra đầu vào
//         if (!sender_id || !receiver_id || !amount || amount <= 0) {
//             return res.status(400).json({ error: "Thiếu thông tin hoặc số tiền không hợp lệ!" });
//         }

//         // Kiểm tra số dư tài khoản gửi
//         const senderBalance = await sql.query `
//             SELECT balance FROM accounts WHERE user_id = ${sender_id}
//         `;

//         if (senderBalance.recordset.length === 0) {
//             return res.status(404).json({ error: "Tài khoản gửi không tồn tại!" });
//         }

//         if (senderBalance.recordset[0].balance < amount) {
//             return res.status(400).json({ error: "Số dư không đủ để thực hiện giao dịch!" });
//         }

//         // Bắt đầu transaction
//         const transaction = sql.transaction();
//         await transaction.begin();

//         try {
//             // Trừ tiền tài khoản gửi
//             await transaction.request().query `
//                 UPDATE accounts SET balance = balance - ${amount} WHERE user_id = ${sender_id}
//             `;

//             // Cộng tiền tài khoản nhận
//             await transaction.request().query `
//                 UPDATE accounts SET balance = balance + ${amount} WHERE user_id = ${receiver_id}
//             `;

//             // Lưu giao dịch
//             await transaction.request().query `
//                 INSERT INTO transactions (sender_id, receiver_id, amount, created_at)
//                 VALUES (${sender_id}, ${receiver_id}, ${amount}, GETDATE())
//             `;

//             // Commit transaction
//             await transaction.commit();
//             res.json({ success: true, message: "Chuyển tiền thành công!" });
//         } catch (err) {
//             await transaction.rollback();
//             throw err;
//         }
//     } catch (error) {
//         console.error("❌ Lỗi chuyển tiền:", error.message);
//         res.status(500).json({ error: `Lỗi server: ${error.message}` });
//     }
// };




// module.exports = { getAccounts, getBalance, depositMoney, createTransaction, transferMoney };

// Hàm lấy danh sách tài khoản
const getAccounts = (req, res) => {
    res.json({ message: "Danh sách tài khoản" });
};

// Hàm lấy số dư theo user_id
const getBalance = (req, res) => {
    const userId = req.params.user_id;
    res.json({ user_id: userId, balance: 100000 });
};

// Hàm nạp tiền vào tài khoản
const depositMoney = (req, res) => {
    const { user_id, amount } = req.body;
    res.json({ message: "Nạp tiền thành công", user_id, amount });
};

// Hàm tạo giao dịch mới
const createTransaction = (req, res) => {
    const { sender, receiver, amount } = req.body;
    res.json({ message: "Giao dịch thành công", sender, receiver, amount });
};

// Kiểm tra xem các function có được export đúng không
console.log("Account Controller Loaded!");
console.log("getAccounts:", getAccounts);
console.log("getBalance:", getBalance);
console.log("depositMoney:", depositMoney);
console.log("createTransaction:", createTransaction);

// Export các hàm để sử dụng trong routes
module.exports = { getAccounts, getBalance, depositMoney, createTransaction };