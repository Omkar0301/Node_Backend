const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/usersModel");

const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json(user);
});

const createUser = expressAsyncHandler(async (req, res) => {
  const userData = req.body;
  const userAvailable = await User.findOne({ email: userData.email });
  if (userAvailable) {
    res.status(400).json({
      message: "User is already Registered",
    });
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await User.create({ ...userData, password: hashedPassword });
  res.status(200).json(user);
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  const updatedUser = await User.findById(id);
  res.status(200).json(updatedUser);
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User Deleted Successfully" });
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
