const express = require("express");
const router = express.Router();
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

// Tạo giao dịch mới
router.post("/", createTransaction);

module.exports = router;