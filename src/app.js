const express = require("express");
const app = express();

const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const adminRoutes = require("./routes/admin.routes");

const errorHandler = require("./middlewares/error.middlewares");

// middleware
app.use(express.json());

app.use(authRoutes);
app.use(productsRoutes);
app.use(adminRoutes);

app.use(errorHandler);

module.exports = app;
