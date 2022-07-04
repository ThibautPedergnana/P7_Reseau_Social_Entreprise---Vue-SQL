const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");

router.post("/", commentCtrl.create);
router.delete("/:id", commentCtrl.delete);

module.exports = router;
