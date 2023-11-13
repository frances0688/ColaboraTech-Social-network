const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {authentication, isAdmin} = require("../middlewares/authentication");

router.post("/", UserController.register);
router.post("/login", UserController.login);

module.exports = router;