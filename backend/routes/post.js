const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
// const multer = require("../middleware/multer");

router.get("/", postController.getAll);
router.post("/", postController.create);

module.exports = router;
