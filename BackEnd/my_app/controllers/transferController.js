const { getAccountBalance, updateAccountBalance } = require("../models/accountModel");
const { createTransaction } = require("../models/transactionModel");
const responseHandler = require("../utils/responseHandler");

async function transferMoney(req, res) {
    const { sender_account_number, receiver_account_number, amount } = req.body;

    try {
        // Kiểm tra số dư
        const senderBalance = await getAccountBalance(sender_account_number);
        if (senderBalance < amount) {
            return responseHandler(res, 400, "Số dư không đủ để thực hiện giao dịch");
        }

        // Thực hiện giao dịch
        await updateAccountBalance(sender_account_number, -amount);
        await updateAccountBalance(receiver_account_number, +amount);
        const transactionId = await createTransaction(req.body);

        // Trả về kết quả
        responseHandler(res, 200, "Chuyển tiền thành công", {
            transaction_id: transactionId,
            sender_account_number,
            receiver_account_number,
            amount,
        });
    } catch (err) {
        responseHandler(res, 500, err.message);
    }
}

module.exports = {
    transferMoney,
};