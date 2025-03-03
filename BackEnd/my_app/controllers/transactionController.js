// const { poolPromise, sql } = require("../connectDB");

// // Lấy danh sách giao dịch
// const getTransactions = async(req, res) => {
//     try {
//         const pool = await poolPromise;
//         const result = await pool.request().query(`
//             SELECT transaction_id, user_id, type, amount, description, 
//                    CONVERT(VARCHAR, created_at, 120) AS created_at 
//             FROM transactions 
//             ORDER BY created_at DESC
//         `);
//         res.json(result.recordset);
//     } catch (err) {
//         res.status(500).json({ error: "Lỗi lấy danh sách giao dịch: " + err.message });
//     }
// };

// // Thêm giao dịch mới
// const addTransaction = async(req, res) => {
//     const { user_id, type, amount, description } = req.body;
//     try {
//         const pool = await poolPromise;

//         // Kiểm tra xem bảng transactions có cột created_at không
//         const columnCheck = await pool.request().query(`
//             SELECT COLUMN_NAME 
//             FROM INFORMATION_SCHEMA.COLUMNS 
//             WHERE TABLE_NAME = 'transactions' AND COLUMN_NAME = 'created_at'
//         `);

//         // Nếu cột 'created_at' không tồn tại, thêm vào
//         if (columnCheck.recordset.length === 0) {
//             await pool.request().query(`
//                 ALTER TABLE transactions ADD created_at DATETIME DEFAULT GETDATE()
//             `);
//             console.log("✅ Cột 'created_at' đã được thêm vào bảng transactions.");
//         }

//         // Thêm giao dịch vào database
//         await pool.request()
//             .input("user_id", sql.Int, user_id)
//             .input("type", sql.VarChar, type)
//             .input("amount", sql.Money, amount)
//             .input("description", sql.NVarChar, description)
//             .query(`
//                 INSERT INTO transactions (user_id, type, amount, description, created_at)
//                 VALUES (@user_id, @type, @amount, @description, GETDATE())
//             `);

//         res.json({ message: "✅ Giao dịch đã được thêm thành công!" });
//     } catch (err) {
//         res.status(500).json({ error: "Lỗi thêm giao dịch: " + err.message });
//     }
// };

// // Tạo giao dịch mới
// // 📌 Tạo giao dịch
// const createTransaction = async(req, res) => {
//     try {
//         const { user_id, amount, type } = req.body; // 👈 Lấy dữ liệu từ body

//         // Kiểm tra đầu vào
//         if (!user_id || !amount || !type) {
//             return res.status(400).json({ error: "Thiếu dữ liệu đầu vào" });
//         }

//         const pool = await poolPromise;

//         // Kiểm tra tài khoản có tồn tại không
//         const checkUser = await pool.request()
//             .input("user_id", sql.Int, user_id)
//             .query("SELECT * FROM accounts WHERE user_id = @user_id");

//         if (checkUser.recordset.length === 0) {
//             return res.status(404).json({ error: "Không tìm thấy tài khoản" });
//         }

//         // Cập nhật số dư nếu là `deposit` hoặc `withdraw`
//         let newBalance = checkUser.recordset[0].balance;
//         if (type === "deposit") {
//             newBalance += amount;
//         } else if (type === "withdraw") {
//             if (newBalance < amount) {
//                 return res.status(400).json({ error: "Số dư không đủ để rút" });
//             }
//             newBalance -= amount;
//         } else {
//             return res.status(400).json({ error: "Loại giao dịch không hợp lệ" });
//         }

//         // Cập nhật số dư trong tài khoản
//         await pool.request()
//             .input("user_id", sql.Int, user_id)
//             .input("new_balance", sql.Money, newBalance)
//             .query("UPDATE accounts SET balance = @new_balance WHERE user_id = @user_id");

//         // Thêm vào bảng transactions
//         await pool.request()
//             .input("user_id", sql.Int, user_id)
//             .input("amount", sql.Money, amount)
//             .input("type", sql.VarChar, type)
//             .query(`
//                 INSERT INTO transactions (user_id, amount, type, created_at) 
//                 VALUES (@user_id, @amount, @type, GETDATE())
//             `);

//         res.json({ message: "Giao dịch thành công", new_balance: newBalance });
//     } catch (error) {
//         console.error("❌ Lỗi tạo giao dịch:", error.message);
//         res.status(500).json({ error: `Lỗi tạo giao dịch: ${error.message}` });
//     }
// };





// module.exports = { getTransactions, addTransaction, createTransaction };


const { poolPromise, sql } = require("../connectDB");

// 📌 Lấy danh sách giao dịch
const getTransactions = async(req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT transaction_id, user_id, type, amount, description, 
                   CONVERT(VARCHAR, created_at, 120) AS created_at 
            FROM transactions 
            ORDER BY created_at DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: "Lỗi lấy danh sách giao dịch: " + err.message });
    }
};

// 📌 Thêm giao dịch mới
const addTransaction = async(req, res) => {
    try {
        const { user_id, type, amount, description } = req.body;

        if (!user_id || !type || !amount) {
            return res.status(400).json({ error: "Thiếu thông tin giao dịch!" });
        }

        const pool = await poolPromise;

        // Kiểm tra tài khoản có tồn tại không
        const checkUser = await pool.request()
            .input("user_id", sql.Int, user_id)
            .query("SELECT * FROM accounts WHERE user_id = @user_id");

        if (checkUser.recordset.length === 0) {
            return res.status(404).json({ error: "Không tìm thấy tài khoản" });
        }

        // Thêm giao dịch vào database
        await pool.request()
            .input("user_id", sql.Int, user_id)
            .input("type", sql.NVarChar, type)
            .input("amount", sql.Decimal(18, 2), amount)
            .input("description", sql.NVarChar, description || "")
            .query(`
                INSERT INTO transactions (user_id, type, amount, description, created_at)
                VALUES (@user_id, @type, @amount, @description, GETDATE())
            `);

        res.json({ message: "✅ Giao dịch đã được thêm thành công!" });
    } catch (err) {
        res.status(500).json({ error: "Lỗi thêm giao dịch: " + err.message });
    }
};

// 📌 Tạo giao dịch (có cập nhật số dư tài khoản)
const createTransaction = async(req, res) => {
    try {
        const { user_id, amount, type } = req.body;

        if (!user_id || !amount || !type) {
            return res.status(400).json({ error: "Thiếu dữ liệu đầu vào!" });
        }

        const pool = await poolPromise;

        // Kiểm tra tài khoản có tồn tại không
        const checkUser = await pool.request()
            .input("user_id", sql.Int, user_id)
            .query("SELECT balance FROM accounts WHERE user_id = @user_id");

        if (checkUser.recordset.length === 0) {
            return res.status(404).json({ error: "Không tìm thấy tài khoản!" });
        }

        let newBalance = parseFloat(checkUser.recordset[0].balance);

        if (type === "deposit") {
            newBalance += parseFloat(amount);
        } else if (type === "withdraw") {
            if (newBalance < parseFloat(amount)) {
                return res.status(400).json({ error: "Số dư không đủ để rút!" });
            }
            newBalance -= parseFloat(amount);
        } else {
            return res.status(400).json({ error: "Loại giao dịch không hợp lệ!" });
        }

        // Cập nhật số dư trong tài khoản
        await pool.request()
            .input("user_id", sql.Int, user_id)
            .input("new_balance", sql.Decimal(18, 2), newBalance)
            .query("UPDATE accounts SET balance = @new_balance WHERE user_id = @user_id");

        // Thêm giao dịch vào bảng transactions
        await pool.request()
            .input("user_id", sql.Int, user_id)
            .input("amount", sql.Decimal(18, 2), amount)
            .input("type", sql.NVarChar, type)
            .query(`
                INSERT INTO transactions (user_id, amount, type, created_at) 
                VALUES (@user_id, @amount, @type, GETDATE())
            `);

        res.json({ message: "✅ Giao dịch thành công!", new_balance: newBalance });
    } catch (error) {
        console.error("❌ Lỗi tạo giao dịch:", error.message);
        res.status(500).json({ error: `Lỗi tạo giao dịch: ${error.message}` });
    }
};

module.exports = { getTransactions, addTransaction, createTransaction };