const {
  getAllUsers,
  registerUser,
  loginUser,
} = require("../services/auth.service");
const AppError = require("../errors/AppError");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const registerUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Неправильные данные", 400);
    }

    const user = await registerUser(email, password);

    if (!user) {
      throw new AppError("Пользователь уже существует", 400);
    }

    res.status(201).json({
      id: user._id,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Неправильные данные", 400);
    }

    const result = await loginUser(email, password);

    if (!result) {
      throw new AppError("Неверный email или пароль", 401);
    }

    res.json({
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers: getAllUsersController,
  registerUser: registerUserController,
  loginUser: loginUserController,
};
