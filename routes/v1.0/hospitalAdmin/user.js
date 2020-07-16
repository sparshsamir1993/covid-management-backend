const User = require("../../../models/user");
const verifyToken = require("../../../middlewares/verifyToken");

var router = require("express").Router();

router.get("/", verifyToken(), async (req, res) => {
  try {
    const userList = await User.findAll({ attributes: ["name", "email"] });
    console.log(userList);
    res.status(200).send(userList);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
