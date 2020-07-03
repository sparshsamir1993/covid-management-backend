var router = require("express").Router();
var User = require("../../../models/user");
const { verifyToken, jwtAuth } = require("../../../middlewares");

router.get("/", verifyToken(), async (req, res, next) => {
  const u = await jwtAuth(req, res, next);
  console.log(u);
  const users = await User.findAll({
    attributes: ["id", "email", "name", "role"],
  });
  res.status(200).send(users);
});

router.patch("/updateRole", verifyToken(), async (req, res, next) => {
  const role = req.body.role;
  const id = req.body.id;
  try {
    const user = await User.update({ role }, { where: { id } });
    console.log(user);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
