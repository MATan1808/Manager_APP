const sql = require("mssql");
const responseHandler = require("../utils/responseHandler");

async function getDashboardData(req, res) {
    console.log("📌 [DEBUG] Nhận request GET /api/dashboard");
    console.log("💰 [DEBUG] Account Number từ Token:", req.user.account_number);

    const { account_number } = req.user;

    if (!account_number) {
        return res.status(400).json({
            status: "FAILED",
            message: "Thiếu account_number trong token",
            data: null,
        });
    }

    try {
        // Lấy thông tin user từ bảng users
        console.log("🔍 [DEBUG] Truy vấn thông tin user...");
        const userResult = await sql.query `
            SELECT username, email 
            FROM users 
            WHERE account_number = ${account_number}
        `;
        console.log("✅ [DEBUG] Kết quả User Query:", userResult.recordset);

        if (!userResult.recordset || userResult.recordset.length === 0) {
            console.log(`⚠️ [WARNING] Không tìm thấy user với account_number: ${account_number}`);
            return res.status(404).json({
                status: "FAILED",
                message: "Không tìm thấy thông tin người dùng",
                data: null,
            });
        }

        const { username, email } = userResult.recordset[0];

        // Lấy số dư từ bảng accounts
        console.log("💰 [DEBUG] Truy vấn số dư tài khoản...");
        const accountResult = await sql.query `
            SELECT account_money 
            FROM accounts 
            WHERE account_number_user = ${account_number}
        `;
        console.log("✅ [DEBUG] Kết quả Account Query:", accountResult.recordset);

        // Kiểm tra nếu accountResult.recordset tồn tại và có dữ liệu
        let balance = 0;
        if (accountResult.recordset && accountResult.recordset.length > 0) {
            balance = accountResult.recordset[0].account_money || 0;
        }

        // Tính tổng chi tiêu từ bảng transactions
        console.log("📊 [DEBUG] Tính tổng chi tiêu...");
        const spentResult = await sql.query `
            SELECT SUM(money_transactions) AS total_spent
            FROM transactions
            WHERE account_number_transfer = ${account_number} 
              AND status_transaction = 'SUCCESS'
        `;
        console.log("✅ [DEBUG] Kết quả Transactions Query:", spentResult.recordset);

        let total_spent = 0;
        if (spentResult.recordset && spentResult.recordset.length > 0 && spentResult.recordset[0].total_spent) {
            total_spent = spentResult.recordset[0].total_spent;
        }

        responseHandler(res, 200, "Lấy dữ liệu dashboard thành công", {
            username,
            email,
            account_number,
            balance,
            total_spent,
        });
    } catch (err) {
        console.log("❌ [ERROR] Lỗi khi lấy dữ liệu dashboard:", err.message);
        responseHandler(res, 500, "Lỗi khi lấy dữ liệu dashboard", err.message);
    }
}

module.exports = {
    getDashboardData,
};