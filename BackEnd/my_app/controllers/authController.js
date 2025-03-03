const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sql = require("mssql");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("LỖI: Thiếu biến môi trường JWT_SECRET!");
    process.exit(1);
}

// 📌 Hàm đăng ký
async function register(req, res) {
    console.log("📌 Body nhận được ở Register:", req.body);
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: "Vui lòng không để trống thông tin" });
    }

    try {
        // 🛠 Kết nối SQL
        const pool = await sql.connect();

        // 🔍 Kiểm tra xem user đã tồn tại chưa
        const checkUser = await pool.request()
            .input("username", sql.VarChar, username)
            .query("SELECT * FROM users WHERE username = @username");

        if (checkUser.recordset.length > 0) {
            return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });
        }

        // 🔐 Mã hóa mật khẩu
        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log("🔹 Mật khẩu nhập vào:", password);
        console.log("🔹 Mật khẩu sau khi mã hóa:", hashedPassword);

        // ✅ Thêm user vào database
        await pool.request()
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, hashedPassword)
            .input("email", sql.VarChar, email)
            .query("INSERT INTO users (username, password, email) VALUES (@username, @password, @email)");

        return res.status(201).json({ message: "Đăng ký thành công" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Lỗi server!!!" });
    }
}


// 📌 Hàm đăng nhập
async function login(req, res) {
    console.log("📌 Body nhận được Login:", req.body);
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Vui lòng nhập tên đăng nhập và mật khẩu" });
    }

    try {
        // 🔍 Kết nối database
        const pool = await sql.connect();
        const result = await pool.request()
            .input("username", sql.VarChar, username)
            .query("SELECT * FROM users WHERE username = @username");

        if (result.recordset.length === 0) {
            return res.status(400).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
        }

        const user = result.recordset[0];

        // 🔐 Kiểm tra mật khẩu
        console.log("🔹 Mật khẩu nhập vào:", password);
        console.log("🔹 Mật khẩu trong DB (hashed):", user.password);

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
        }

        // 🔑 Tạo token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

        return res.json({ message: "Đăng nhập thành công", token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Lỗi server!!!" });
    }
}


module.exports = { register, login };