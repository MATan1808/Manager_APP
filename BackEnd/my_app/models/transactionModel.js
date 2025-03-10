const { sql } = require("../connectDB");

// Lưu thông tin giao dịch
async function createTransaction(data) {
    try {
        const { sender_account_number, receiver_account_number, amount } = data;

        // Thực hiện truy vấn INSERT và lấy transaction_id
        const result = await sql.query `
      INSERT INTO transactions (
        user_account_transfer, 
        user_account_receive, 
        account_number_transfer, 
        account_number_receive, 
        money_transactions, 
        status_transaction, 
        create_at_transaction
      )
      OUTPUT INSERTED.transactions_id
      VALUES (
        (SELECT name_accounts FROM accounts WHERE account_number_user = ${sender_account_number}),
        (SELECT name_accounts FROM accounts WHERE account_number_user = ${receiver_account_number}),
        ${sender_account_number},
        ${receiver_account_number},
        ${amount},
        'SUCCESS',
        GETDATE()
      )
    `;

        // Trả về transaction_id
        return result.recordset[0].transactions_id;
    } catch (err) {
        throw new Error(`Lỗi khi lưu giao dịch: ${err.message}`);
    }
}

module.exports = {
    createTransaction,
};