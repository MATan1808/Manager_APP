const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log("\ud83d\ude80 Authorization Header:", authHeader); // Debug header nhận được

    const token = authHeader && authHeader.split(" ")[1];
    console.log("\ud83d\udd0d Extracted Token:", token); // Debug token đã tách ra

    if (!token) {
        console.log("\u26d4 Token không được cung cấp!");
        return res.status(401).json({ status: "FAILED", message: "Token không được cung cấp" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("\u274c Token không hợp lệ hoặc đã hết hạn!", err.message);
            return res.status(403).json({ status: "FAILED", message: "Token không hợp lệ" });
        }
        console.log("\u2705 Token hợp lệ, User Data:", user);
        req.user = user; // Đính kèm thông tin user vào request
        next();
    });
}

module.exports = authenticateToken;