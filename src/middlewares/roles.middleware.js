const AppError = require("../errors/AppError");
const roleMiddleware = (roles = []) => {
  return (req, res, next) => {
    if (!roles) {
      return next(new AppError("Доступ запрещен"), 403);
    }
    next();
  };
};

module.exports = roleMiddleware;
