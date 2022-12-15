const { admin, currUserOradmin } = require("../middleware/authorization ");
const verifyToken = require("../middleware/TokenVerification");
const router = require("express").Router();
const User = require("../models/User");


router.get("/get/:id", [verifyToken, admin], async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    if (getUser) res.status(200).send({ status: "ok", user: getUser });
    else res.status(404).send({ status: "error", message: "not found" });
  } catch (error) {
    const err = error.message;
    res.status(500).send({ status: "error", message: err });
  }
});



router.get("/getAll", [verifyToken, admin], async (req, res) => {
  User.find({}, (err, user) => {
    if (err) res.status(500).send({ status: "error", message: err });
    else res.status(200).send({ status: "ok", users: user });
  });
});



router.patch(
  "/update/:id",
  [verifyToken, currUserOradmin],
  async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send({ status: "ok", user: updatedUser });
    } catch (error) {
      const err = error.message;
      res.status(500).send({ status: "error", message: err });
    }
  }
);


router.delete("/delete/:id", [verifyToken, admin], async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (deleteUser)
      res.status(200).send({ status: "ok", message: "user deleted" });
    else res.status(500).send({ status: "error", message: "not found" });
  } catch (error) {
    const err = error.message;
    res.status(500).send({ status: "error", message: err });
  }
});


router.get("/currUser", verifyToken, async (req, res) => {
  const tok = req.cookies
  res.status(200).send({ status: "ok", message: tok });
})


module.exports = router;