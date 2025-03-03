const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

module.exports = router;

//D:\Official_Project\Project_QT_BANK\BackEnd\my_app\controllers\authController.js