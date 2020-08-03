const User = require("../../../models/user");
const Appointment = require("../../../models/appointment");
// const Patient = require("../../../models/patient");
// const User = require("../../../models/user");
const Hospital = require("../../../models/hospital");
const verifyToken = require("../../../middlewares/verifyToken");
const {
  APPOINTMENT_BOOKED,
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
  const appointments = await Appointment.findAll({
    where: { appointmentDate: date, hospitalId },
  });
  const bookedTimes = appointments.map((appointment) =>
    parseInt(appointment.appointmentTime.split(":")[0])
  );
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

module.exports = router;
