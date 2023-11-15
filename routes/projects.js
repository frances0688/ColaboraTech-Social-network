const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController.js");
const {authentication, isAdmin} = require("../middlewares/authentication.js");

router.post("/", authentication, ProjectController.create);
router.put("/id/:_id", ProjectController.update);
router.delete("/id/:_id", authentication, isAdmin, ProjectController.delete);
router.get("/", ProjectController.getAll);
router.get("/title/:title",ProjectController.getProjectByName);
router.get("/id/:_id", ProjectController.getById);
router.post("/projects/:_id/like", ProjectController.like);
router.post("/projects/:_id/unlike", ProjectController.unlike);

module.exports = router;
