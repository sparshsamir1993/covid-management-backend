const User = require("../../../models/user");
const Appointment = require("../../../models/appointment");
// const Patient = require("../../../models/patient");
// const User = require("../../../models/user");
const Hospital = require("../../../models/hospital");
const verifyToken = require("../../../middlewares/verifyToken");
const {
  APPOINTMENT_CONFIRMED,
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

router.get("/list/:hospitalId", verifyToken(), async (req, res, next) => {
  try {
    console.log("in listtt");
    const hospitalId = req.params.hospitalId;
    console.log(hospitalId);
    const appointmentList = await Appointment.findAll({
      where: { hospitalId },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });

    res.status(200).send(appointmentList);
  } catch (err) {
    console.log(err);
  }
});

router.post("/book", verifyToken(), async (req, res, next) => {
  try {
    const {
      isNewUser,
      userId,
      hospitalId,
      appointmentDate,
      appointmentTime,
      email,
      name,
    } = req.body;
    const appointmentData = {
      isNewUser,
      userId,
      hospitalId,
      appointmentDate,
      appointmentTime,
      email,
      name,
    };
    if (!isNewUser) {
      console.log(appointmentDate);
      const newAppointment = await createAppointment(
        {
          userId,
          hospitalId,
          appointmentStatus: APPOINTMENT_CONFIRMED,
          appointmentDate,
          appointmentTime,
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

router.put(
  "/updateAppointmentStatus",
  verifyToken(),
  async (req, res, next) => {
    try {
      console.log(req.body);
      let { appointmentId, appointmentStatus } = req.body;
      const updatedAppointment = await Appointment.update(
        { appointmentStatus },
        { where: { id: appointmentId } }
      );
      console.log(updatedAppointment);
      if (updatedAppointment[0] > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);

const createAppointment = async (data, req, res) => {
  let {
    userId,
    appointmentStatus,
    appointmentDate,
    appointmentTime,
    hospitalId,
  } = data;
  console.log({
    userId,
    hospitalId,
    appointmentStatus,
    appointmentDate,
    appointmentTime,
  });
  if (
    !userId ||
    !hospitalId ||
    !appointmentDate ||
    !appointmentStatus ||
    !appointmentTime
  ) {
    res.status(500).send("Check Appointment Data");
  }
  try {
    const newAppointment = await Appointment.create({
      userId,
      hospitalId,
      appointmentStatus,
      appointmentDate: new Date(appointmentDate).setHours(0, 0, 0, 0),
      appointmentTime,
    });
    return newAppointment;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = router;
