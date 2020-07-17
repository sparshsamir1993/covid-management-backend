const User = require("../../../models/user");
const Appointment = require("../../../models/appointment");
const Patient = require("../../../models/patient");
const verifyToken = require("../../../middlewares/verifyToken");

Appointment.belongsTo(Patient, {
  as: "patient",
});
Patient.hasMany(Appointment, {
  as: "appointments",
});
User.hasOne(Patient, {
  as: "patient",
});

Patient.belongsTo(User, {
  as: "user",
});

var router = require("express").Router();

router.post("/book", verifyToken(), async (req, res) => {
  try {
    console.log(req.body);
    const { isNewUser, userId } = req.body;
    if (!isNewUser) {
      // const patient =
    }
    res.status(200).send({});
    // const userList = await User.findOne({ where: {} });
    // console.log(userList);
    // res.status(200).send(userList);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
