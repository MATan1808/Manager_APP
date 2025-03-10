// const express = require("express");
// const morgan = require("morgan");
// const dotenv = require("dotenv");
// const { connectDB } = require("./connectDB"); // Import kết nối DB
// const bodyParser = require("body-parser");
// const routes = require("./routes"); // Import duy nhất file routes/index.js
// const accountRoutes = require("./routes/accountRoutes");
// // Middleware
// dotenv.config(); // Load biến môi trường từ .env

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Kết nối SQL Server
// connectDB();

// // Middleware
// app.use(express.json()); // Parse JSON body
// app.use(morgan("dev")); // Ghi log request

// console.log("✅ Express đã khởi động thành công!");
// console.log("✅ Morgan đang hoạt động!");

// // Kiểm tra Nodemon
// const isNodemon = process.argv.some(arg => arg.includes("nodemon"));
// if (isNodemon) {
//     console.log("✅ Nodemon đang chạy, bạn có thể cập nhật code mà không cần restart!");
// } else {
//     console.warn("⚠️ Bạn đang chạy Node.js trực tiếp, nếu muốn auto-restart, hãy chạy bằng `npm start` hoặc `nodemon server.js`.");
// }

// // Route kiểm tra server
// app.get("/", (req, res) => {
//     res.send("🚀 Server đang chạy, kiểm tra Morgan, Express và Nodemon thành công!");
// });

// // ✅ Chỉ cần gọi 1 lần, tất cả API đều hoạt động
// app.use("/api", routes);
// // Định nghĩa route cho tài khoản
// app.use("/api/accounts", accountRoutes);
// console.log("🚀 Tất cả routes đã được load từ routes/index.js!");

// // Lắng nghe server
// app.listen(PORT, () => {
//     console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
//     console.log("🚀 Nhấn Ctrl + C để dừng server");
// });
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectDB } = require("./connectDB");
const bodyParser = require("body-parser");
const routes = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối SQL Server
connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Sử dụng routes
app.use("/api", routes);

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});