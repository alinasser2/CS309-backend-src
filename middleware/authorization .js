const admin = (req, res, next) => {
  if (!req.user.admin)
    return res.status(200).send({ status: "error", message: "forbidden.." });
  next();
};

const currUserOradmin = (req, res, next) => {
  if (req.user.admin || req.user.id === req.cookies.access_token.id) next();
  else
    res
      .status(200)
      .send({ status: "error", message: "You don't have the permissions!!" });
};

module.exports = {admin, currUserOradmin};
