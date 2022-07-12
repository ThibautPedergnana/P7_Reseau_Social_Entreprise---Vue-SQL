const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const multer = require("../middlewares/multer");

router.get("/", userController.getAll);
router.get("/:id/posts", userController.getPostsByUser);
router.get("/:id", userController.getOne);
router.put("/", userController.updateAccount);
// Requête patch car un seul élément est modifié
router.patch("/password", userController.updatePassword);
router.delete("/", userController.delete);
// Requête patch car un seul élément est modifié
router.patch("/image", multer, userController.modifyPP);

module.exports = router;
