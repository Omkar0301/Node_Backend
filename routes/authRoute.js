const express = require("express");
const { loginUser, currentUser } = require("../controllers/authController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/login", loginUser);
router.get("/current", currentUser);

module.exports = router;
