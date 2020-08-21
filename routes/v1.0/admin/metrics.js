const verifyToken = require("../../../middlewares/verifyToken");

var router = require("express").Router();
const Users = require("../../../models/user");
const Appointment = require("../../../models/appointment");
router.get("/users", verifyToken(), async (req, res, next) => {
  try {
    let users = await Users.findAll({
      attributes: ["name", "email", "role", "createdAt"],
      include: [{ model: Appointment, as: "appointments", required: false }],
    });
    res.status(200).send(users);
  } catch (err) {
    res.sendStatus(404);
    console.log(err);
  }
});

router.get("/appointments", verifyToken(), async (req, res, next) => {
  try {
    let appointments = await Appointment.findAll();
    res.status(200).send(appointments);
  } catch (err) {
    res.sendStatus(404);
    console.log(err);
  }
});

module.exports = router;
