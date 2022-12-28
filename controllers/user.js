const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    if (getUser) res.status(200).send({ status: "ok", user: getUser });
    else res.status(200).send({ status: "error", message: "not found" });
  } catch (error) {
    const err = error.message;
    res.status(200).send({ status: "error", message: err });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send({ status: "ok", users: allUsers, count: allUsers.length});
  } catch (error) {
    const err = error.message;
    res.status(200).send({ status: "error", message: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ status: "ok", user: updatedUser });
  } catch (error) {
    const err = error.message;
    res.status(200).send({ status: "error", message: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (deleteUser)
      res.status(200).send({ status: "ok", message: "user deleted" });
    else res.status(200).send({ status: "error", message: "not found" });
  } catch (error) {
    const err = error.message;
    res.status(200).send({ status: "error", message: err });
  }
};

const getCurrUser = async (req, res) => {
  const tok = req.cookies
  res.status(200).send({ status: "ok", message: tok });
};

module.exports = {
  getAllUsers,
  getCurrUser,
  updateUser,
  deleteUser,
  getUser
};