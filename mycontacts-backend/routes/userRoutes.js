const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// router.route("/current").get(validateToken, currentUser)
router.get("/current", validateToken, currentUser)

module.exports = router;