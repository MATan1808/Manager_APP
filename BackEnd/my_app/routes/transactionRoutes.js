const express = require("express");
const router = express.Router();
const { sql } = require("../connectDB");
const { createTransaction } = require("../controllers/transactionController");
// Lấy danh sách giao dịch
router.get("/", async(req, res) => {
    try {
        const result = await sql.query `SELECT * FROM transactions`;
        res.json({ transactions: result.recordset });
    } catch (error) {
        console.error("❌ Lỗi lấy danh sách giao dịch:", error.message);
        res.status(500).json({ error: `Lỗi lấy danh sách giao dịch: ${error.message}` });
    }
});

// Thêm giao dịch mới
router.post("/", async(req, res) => {
    try {
        const { amount, description, account_id } = req.body;
        if (!amount || !description || !account_id) {
            return res.status(400).json({ error: "Thiếu dữ liệu đầu vào" });
        }

        await sql.query `
            INSERT INTO transactions (amount, description, account_id)
            VALUES (${amount}, ${description}, ${account_id})
        `;

        res.json({ message: "Thêm giao dịch thành công!" });
    } catch (error) {
        console.error("❌ Lỗi thêm giao dịch:", error.message);
        res.status(500).json({ error: `Lỗi thêm giao dịch: ${error.message}` });
    }
});

module.exports = router;