const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const rolesMiddleware = require("../middlewares/roles.middleware.js");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller.js");

router.get(
  "/products",
  authMiddleware,
  rolesMiddleware(["admin"]),
  getAllProducts
);
router.get("/products/:id", getProductById);

router.post("/products", authMiddleware, createProduct);
router.put("/products/:id", authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

module.exports = router;
