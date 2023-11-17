const express = require("express");
const PostController = require("../controllers/PostController");
const {isAuthorPost} = require("../middlewares/isAuthor");
const {authentication, isAdmin} = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, PostController.create);
router.get("/", authentication, PostController.findAll);
router.get("/:_id", authentication, PostController.findById);
router.get("/text/:text", authentication, PostController.getPostsByName);
router.put("/:_id", authentication, isAuthorPost, PostController.update);
router.put("/like/:_id", authentication, PostController.insertLike);
router.put("/unlike/:_id", authentication, PostController.deleteLike);
router.delete("/:_id", authentication, isAuthorPost, PostController.delete);

module.exports = router;
