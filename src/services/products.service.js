const Product = require("../models/product.models");

const getAllProducts = async ({
  userId,
  page,
  limit,
  minPrice,
  maxPrice,
  sortBy,
  order,
}) => {
  const query = { user: userId };

  if (minPrice) {
    query.price = { ...query.price, $gte: Number(minPrice) };
  }

  if (maxPrice) {
    query.price = { ...query.price, $gte: Number(maxPrice) };
  }

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(query),
  ]);

  return {
    products,
    total,
  };
};

const getProductById = async (id) => {
  return await Product.findById(id); // Возвращаем id у продукта
};

const createProduct = async (title, price, userId) => {
  const product = new Product({ title, price, user: userId });
  return await product.save();
};

const updateProduct = async (id, title, price, userId) => {
  return await Product.findByIdAndUpdate(
    { _id: id, user: userId },
    { title, price },
    { new: true }
  );
};

const deleteProduct = async (id, userId) => {
  return await Product.findByIdAndDelete({ _id: id, user: userId });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
