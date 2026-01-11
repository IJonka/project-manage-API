const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.models");

const getAllUsers = async () => {
  return await User.find();
};

const registerUser = async (email, password) => {
  const exitingUser = await User.findOne({ email });
  if (exitingUser) {
    return null;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashPassword });

  return await user.save();
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return { user, token };
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
};
