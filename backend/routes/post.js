const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const multer = require("../middlewares/multer");

router.get("/", postController.getAll);
router.get("/:id", postController.getOne);
router.get("/:id/comments", postController.getComments);
router.post("/", multer, postController.create);
router.delete("/:id", postController.delete);
router.get("/:id/liked", postController.liked);

module.exports = router;
