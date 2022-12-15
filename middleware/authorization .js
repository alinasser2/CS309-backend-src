const admin = (req, res, next) => {
  if (!req.user.admin)
    return res.status(403).send({ status: "error", message: "forbidden.." });
  next();
};

const currUserOradmin = (req, res, next) => {
  if (req.user.admin || req.user.id === req.params.id) next();
  else
    res
      .status(403)
      .send({ status: "error", message: "You don't have the permissions!!" });
};

module.exports = {admin, currUserOradmin};
