const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  registerUser,
  loginUser,
} = require("../controllers/auth.controller.js");

router.get("/auth/users", getAllUsers);

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

module.exports = router;
