const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/products.service");
const AppError = require("../errors/AppError");

const getAllProductsController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const {
      page = 1,
      limit = 5,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const { products, total } = await getAllProducts({
      userId,
      page: Number(page),
      limit: Number(limit),
      minPrice,
      maxPrice,
      sortBy,
      order,
    });

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: products,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    if (!product) {
      throw new AppError("Продукт не найден", 404);
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const createProductController = async (req, res, next) => {
  try {
    const { title, price } = req.body;
    const userId = req.user.id;

    if (!title || !price) {
      throw new AppError("Неправильные данные", 400);
    }

    const newProduct = await createProduct(title, price, userId);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const updateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, price } = req.body;
    const userId = req.user.id;

    if (!title || !price) {
      throw new AppError("Неправильные данные", 400);
    }

    const product = await updateProduct(id, title, price, userId);
    if (!product) {
      throw new AppError("Продукт не найден", 404);
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProductController = async (req, res, next) => {
  try {
    const product = await deleteProduct(req.params.id, req.user.id);

    if (!product) {
      throw new AppError("Продукт не найден", 404);
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts: getAllProductsController,
  getProductById: getProductByIdController,
  createProduct: createProductController,
  updateProduct: updateProductController,
  deleteProduct: deleteProductController,
};
