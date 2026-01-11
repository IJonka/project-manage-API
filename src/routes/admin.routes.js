const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const rolesMiddleware = require("../middlewares/roles.middleware.js");
const {
  getAllProductsAdmin,
  deleteProductAdmin,
} = require("../controllers/admin.controller.js");

router.get(
  "/admin/products",
  authMiddleware,
  rolesMiddleware(["admin"]),
  getAllProductsAdmin
);

router.delete(
  "/admin/products/:id",
  authMiddleware,
  rolesMiddleware(["admin"]),
  deleteProductAdmin
);

module.exports = router;
