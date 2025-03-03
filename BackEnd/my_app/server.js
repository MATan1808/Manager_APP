const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectDB } = require("./connectDB"); // Import kết nối DB

// folder router
const authRoutes = require("./routes/authRoutes"); // Import routes đăng ký & đăng nhập
const apiRoutes = require("./routes/protectedRoutes"); // Import routes bảo vệ
const transactionRoutes = require("./routes/transactionRoutes"); // Import transaction (ĐÃ FIX TÊN BIẾN)
const accountRoutes = require("./routes/accountRoutes"); // Import account routes

// folder middleware
const authMiddleware = require("./middleware/authMiddleware"); // import middleware

dotenv.config(); // Load biến môi trường từ .env

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối SQL Server
connectDB();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(morgan("dev")); // Ghi log request

console.log("✅ Express đã khởi động thành công!");
console.log("✅ Morgan đang hoạt động!");

// Kiểm tra Nodemon
const isNodemon = process.argv.some(arg => arg.includes("nodemon"));
if (isNodemon) {
    console.log("✅ Nodemon đang chạy, bạn có thể cập nhật code mà không cần restart!");
} else {
    console.warn("⚠️ Bạn đang chạy Node.js trực tiếp, nếu muốn auto-restart, hãy chạy bằng `npm start` hoặc `nodemon server.js`.");
}

// Route kiểm tra server
app.get("/", (req, res) => {
    res.send("🚀 Server đang chạy, kiểm tra Morgan, Express và Nodemon thành công!");
});

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes); // FIXED ROUTE
console.log("🚀 API transactions đã được gọi!");


// Lắng nghe server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    console.log("🚀 Nhấn Ctrl + C để dừng server");
});