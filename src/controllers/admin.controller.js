const AppError = require("../errors/AppError");
const {
  getAllProductsAdmin,
  deleteProductAdmin,
} = require("../services/admin.service");

const getAllProductsAdminController = async (req, res, next) => {
  try {
    const products = await getAllProductsAdmin();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const deleteProductAdminController = async (req, res, next) => {
  try {
    const product = await deleteProductAdmin(req.params.id);

    if (!product) {
      throw new AppError("Продукт не найден", 404);
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProductsAdmin: getAllProductsAdminController,
  deleteProductAdmin: deleteProductAdminController,
};
