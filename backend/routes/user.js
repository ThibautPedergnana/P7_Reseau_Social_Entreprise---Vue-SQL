const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
// const multer = require("../middleware/multer");

router.get("/", userController.getAll);
router.get("/:id/posts", userController.getPostsByUser);
router.get("/:id", userController.getOne);
router.put("/", userController.updateAccount);
router.patch("/password", userController.updatePassword);
router.delete("/", userController.delete);

module.exports = router;
