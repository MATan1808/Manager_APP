const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, ".env") });
require("dotenv").config();


// Load biến môi trường từ thư mục gốc
console.log("📂 Đường dẫn file .env:", path.resolve(__dirname, ".env"));

console.log("🔍 Kiểm tra biến môi trường:");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "*****" : "Không có dữ liệu");
console.log("DB_SERVER:", process.env.DB_SERVER);
console.log("DB_DATABASE:", process.env.DB_DATABASE);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_ENCRYPT:", process.env.DB_ENCRYPT);
// Load biến môi trường từ file .env
const sql = require("mssql"); // Import thư viện mssql để làm việc với SQL Server

// Cấu hình kết nối SQL Server từ file .env
const config = {
    user: process.env.DB_USER, // Lấy user từ biến môi trường
    password: process.env.DB_PASSWORD, // Lấy password từ biến môi trường
    server: process.env.DB_SERVER, // Lấy server từ biến môi trường
    database: process.env.DB_DATABASE, // Lấy database từ biến môi trường
    port: Number(process.env.DB_PORT) || 1433, // Chuyển port thành số nguyên, mặc định 1433
    options: {
        encrypt: process.env.DB_ENCRYPT === "true", // Dùng SSL nếu đặt true
        enableArithAbort: true, // Hỗ trợ xử lý toán học
        trustServerCertificate: true, // Bắt buộc khi chạy local
    },
};




// Function kết nối đến SQL Server
async function connectDB() {
    try {
        await sql.connect(config); // Kết nối SQL Server
        console.log("✅ Kết nối SQL Server thành công!");
    } catch (err) {
        console.error("❌ Lỗi kết nối SQL Server:", err.message);
        console.error("Chi tiết lỗi:", err);
        process.exit(1); // Thoát khi kết nối thất bại
    }
}

// Xuất module để file khác có thể sử dụng
module.exports = {
    connectDB,
    sql,
    config
};