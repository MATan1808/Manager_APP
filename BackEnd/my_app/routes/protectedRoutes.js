const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Middleware xác thực JWT

// Route bảo vệ bằng token
router.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "✅ Bạn đã truy cập vào route bảo vệ(JWT)!!!", user: req.user });
});

module.exports = router;