const User = require("../../../models/user");
const Appointment = require("../../../models/appointment");
// const Patient = require("../../../models/patient");
// const User = require("../../../models/user");
const Hospital = require("../../../models/hospital");
const verifyToken = require("../../../middlewares/verifyToken");
const {
  APPOINTMENT_CONFIRMED,
} = require("../../../constants/appointmentConstants");

var router = require("express").Router();

router.get("/slotlist", verifyToken(), async (req, res, next) => {
  let { selectedDate, hospitalId } = req.query;
  if (!selectedDate) {
    res.sendStatus(500);
  }
  console.log(selectedDate);
  let date = new Date(parseInt(selectedDate));
  console.log(date);
  let dateConstructed =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const appointments = await Appointment.findAll({
    where: { appointmentDate: dateConstructed, hospitalId },
  });
  const bookedTimes = appointments.map((appointment) =>
    parseInt(appointment.appointmentTime.split(":")[0])
  );
  console.log(bookedTimes);
  let slotsToSend = [];

  for (let i = 7; i <= 23; i++) {
    if (bookedTimes.includes(i)) {
      slotsToSend.push({
        slot: i,
        isAvailable: false,
      });
    } else {
      slotsToSend.push({
        slot: i,
        isAvailable: true,
      });
    }
  }

  console.log(slotsToSend);
  res.status(200).send(slotsToSend);
});

router.get("/userAppointments", verifyToken(), async (req, res, next) => {
  let { userId } = req.query;
  try {
    const userAppointmentList = await Appointment.findAll({
      where: { userId },
      include: [
        {
          model: Hospital,
          as: "hospital",
          required: true,
        },
      ],
      order: [["appointmentDate"], ["appointmentTime"]],
    });
    let apList = await Promise.all(
      userAppointmentList.map(async (ap) => {
        ap = await ap.toJSON();
        return { ...ap, appointmentTime: ap.appointmentTime.split(":")[0] };
      })
    );
    console.log(apList);
    res.status(200).send(apList);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/appointmentDetail", verifyToken(), async (req, res, next) => {
  let { appointmentId } = req.query;
  try {
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
      include: [
        {
          model: Hospital,
          as: "hospital",
          required: true,
        },
      ],
    });
    let apTime = appointment.dataValues.appointmentTime;
    res.status(200).send({
      ...appointment.dataValues,
      appointmentTime: apTime.split(":")[0],
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/book", verifyToken(), async (req, res, next) => {
  let { appointmentDate, appointmentTime, userId, hospitalId } = req.body;
  appointmentTime = appointmentTime + ":00:00";
  try {
    console.log(req.body);
    const newAppointment = await Appointment.create({
      userId,
      hospitalId,
      appointmentStatus: APPOINTMENT_CONFIRMED,
      appointmentDate,
      appointmentTime,
    });
    let apTime = newAppointment.dataValues.appointmentTime;
    res.status(200).send({
      ...newAppointment.dataValues,
      appointmentTime: apTime.split(":")[0],
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
