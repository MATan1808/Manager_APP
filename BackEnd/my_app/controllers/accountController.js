const { sql } = require("../connectDB");
const { createTransaction } = require("../controllers/transactionController");

// Lấy danh sách tài khoản
const getAccounts = async(req, res) => {
    try {
        const result = await sql.query `SELECT * FROM accounts`;
        res.json({ accounts: result.recordset });
    } catch (error) {
        console.error("❌ Lỗi lấy danh sách tài khoản:", error.message);
        res.status(500).json({ error: `Lỗi lấy danh sách tài khoản: ${error.message}` });
    }
};

// Lấy số dư theo user_id
const getBalance = async(req, res) => {
    try {
        const { user_id } = req.params;
        console.log("📌 Nhận user_id từ URL:", user_id);

        if (!user_id) return res.status(400).json({ error: "Thiếu user_id" });

        // Chuyển `user_id` sang số nguyên
        const userId = parseInt(user_id, 10);
        console.log("📌 userId đã chuyển đổi:", userId);

        if (isNaN(userId)) return res.status(400).json({ error: "user_id không hợp lệ" });

        const result = await sql.query `
            SELECT balance FROM accounts WHERE user_id = ${userId}
        `;

        console.log("📌 Kết quả truy vấn:", result.recordset);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: "Không tìm thấy tài khoản" });
        }

        res.json({ balance: result.recordset[0].balance });
    } catch (error) {
        console.error("❌ Lỗi lấy số dư tài khoản:", error.message);
        res.status(500).json({ error: `Lỗi lấy số dư tài khoản: ${error.message}` });
    }
};



// Nạp tiền vào tài khoản
const depositMoney = async(req, res) => {
    try {
        const { user_id, amount } = req.body; // 📌 Lấy dữ liệu từ `body`, không phải `params`

        if (!user_id || !amount) {
            return res.status(400).json({ error: "Thiếu user_id hoặc amount!" });
        }

        // Thực hiện truy vấn để cập nhật số dư tài khoản
        const result = await sql.query(
            `UPDATE accounts SET balance = balance + ${amount} WHERE user_id = ${user_id}`
        );

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: "Nạp tiền thành công!" });
        } else {
            res.status(404).json({ error: "Không tìm thấy tài khoản!" });
        }
    } catch (err) {
        console.error("❌ Lỗi nạp tiền:", err.message);
        res.status(500).json({ error: "Lỗi server!" });
    }
};


module.exports = { getAccounts, getBalance, depositMoney, createTransaction };