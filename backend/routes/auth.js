const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const validEmail = require("../middlewares/email");
const verifyAuthorization = require("../middlewares/verifyAuthorization");

// router.post("/register", validEmail, authController.register);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/currentUser", verifyAuthorization, authController.currentUser);

module.exports = router;
