const usersController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/userprofile", usersController.userProfile);
router.post("/otpLogin", usersController.otpLogin);
router.post("/verifyOTP", usersController.verifyOTP);
router.patch("/:id", usersController.update);
router.get("/:id", usersController.getInfo);
router.get("/", usersController.apiInit);

module.exports = router;