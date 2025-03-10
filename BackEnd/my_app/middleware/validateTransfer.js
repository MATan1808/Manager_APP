function validateTransfer(req, res, next) {
    const { sender_account_number, receiver_account_number, amount } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!sender_account_number || !receiver_account_number || !amount) {
        return res.status(400).json({
            status: "FAILED",
            message: "Thiếu thông tin bắt buộc (sender_account_number, receiver_account_number, amount)",
        });
    }

    // Kiểm tra số tiền hợp lệ
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({
            status: "FAILED",
            message: "Số tiền phải là một số dương",
        });
    }

    // Kiểm tra số tài khoản không trùng nhau
    if (sender_account_number === receiver_account_number) {
        return res.status(400).json({
            status: "FAILED",
            message: "Số tài khoản người gửi và người nhận không được trùng nhau",
        });
    }

    // Nếu tất cả hợp lệ, chuyển sang bước tiếp theo
    next();
}

module.exports = validateTransfer;