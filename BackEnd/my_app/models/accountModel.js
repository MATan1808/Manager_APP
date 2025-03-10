const { sql } = require("../connectDB");
//Chức năng: Chứa các hàm truy vấn SQL liên quan đến tài khoản.
// Lấy số dư của tài khoản
async function getAccountBalance(accountNumber) {
    try {
        const result = await sql.query `
      SELECT account_money 
      FROM accounts 
      WHERE account_number_user = ${accountNumber}
    `;
        return result.recordset[0].account_money;
    } catch (err) {
        throw new Error(`Lỗi khi lấy số dư: ${err.message}`);
    }
}

// Cập nhật số dư của tài khoản
async function updateAccountBalance(accountNumber, amount) {
    try {
        await sql.query `
      UPDATE accounts 
      SET account_money = account_money + ${amount}
      WHERE account_number_user = ${accountNumber}
    `;
    } catch (err) {
        throw new Error(`Lỗi khi cập nhật số dư: ${err.message}`);
    }
}

module.exports = {
    getAccountBalance,
    updateAccountBalance,
};