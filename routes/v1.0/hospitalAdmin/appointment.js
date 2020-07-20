const User = require("../../../models/user");
const Appointment = require("../../../models/appointment");
// const Patient = require("../../../models/patient");
// const User = require("../../../models/user");
const Hospital = require("../../../models/patient");
const verifyToken = require("../../../middlewares/verifyToken");
const {
  APPOINTMENT_BOOKED,
} = require("../../../constants/appointmentConstants");

Appointment.belongsTo(User, {
  as: "user",
});
User.hasMany(Appointment, {
  as: "appointments",
});

Appointment.belongsTo(Hospital, {
  as: "hospital",
});
Hospital.hasMany(Appointment, {
  as: "appointments",
});

// Appointment.hasOne(Hospital, { as: "hospital" });

var router = require("express").Router();

router.post("/book", verifyToken(), async (req, res, next) => {
  try {
    const {
      isNewUser,
      userId,
      hospitalId,
      appointmentDateTime,
      email,
      name,
    } = req.body;
    const appointmentData = {
      isNewUser,
      userId,
      hospitalId,
      appointmentDateTime,
      email,
      name,
    };
    if (!isNewUser) {
      const newAppointment = await createAppointment(
        {
          userId,
          hospitalId,
          appointmentStatus: APPOINTMENT_BOOKED,
          appointmentDateTime,
        },
        req,
        res
      );
      res.status(200).send(newAppointment);
    } else {
      // if it is a new user
      //TODO
    }
  } catch (err) {
    console.log(err);
  }
});

const createAppointment = async (data, req, res) => {
  let { userId, appointmentStatus, appointmentDateTime, hospitalId } = data;
  console.log({ userId, hospitalId, appointmentStatus, appointmentDateTime });
  if (!userId || !hospitalId || !appointmentDateTime || !appointmentStatus) {
    res.status(500).send("Check Appointment Data");
  }
  try {
    const newAppointment = await Appointment.create({
      userId,
      hospitalId,
      appointmentStatus,
      appointmentDateTime,
    });
    return newAppointment;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = router;
