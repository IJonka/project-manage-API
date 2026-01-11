const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Нет токена", 401));
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return next(new AppError("Неверный формат токена", 401));
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch {
    return next(new AppError("Невалидный токен", 401));
  }
};

module.exports = authMiddleware;
