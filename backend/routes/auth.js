const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const validEmail = require("../middlewares/email");

// router.post("/register", validEmail, authController.register);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
