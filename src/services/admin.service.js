const Product = require("../models/product.models");

const getAllProductsAdmin = async () => {
  return await Product.find();
};

const deleteProductAdmin = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProductsAdmin,
  deleteProductAdmin,
};
