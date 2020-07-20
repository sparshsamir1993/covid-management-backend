const User = require("../../../models/user");
const Appointment = require("../../../models/appointment");
const Patient = require("../../../models/patient");
const verifyToken = require("../../../middlewares/verifyToken");
const {
  APPOINTMENT_BOOKED,
} = require("../../../constants/appointmentConstants");

Appointment.belongsTo(Patient, {
  as: "patient",
});
Patient.hasMany(Appointment, {
  as: "appointments",
});
User.hasMany(Patient, {
  as: "patient",
});

Patient.belongsTo(User, {
  as: "user",
});

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
      const currentUser = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Patient,
            as: "patient",
          },
        ],
      });
      const userPatientHistory = currentUser.patient;
      const currentHospitalPatientHistory = userPatientHistory.filter(
        (history) => history.hospitalId === hospitalId
      ).length
        ? userPatientHistory.filter(
            (history) => history.hospitalId === hospitalId
          )[0]
        : null;
      if (currentHospitalPatientHistory) {
        // patient already present in hospital records

        let patientId = currentHospitalPatientHistory.id;

        const newAppointment = await createAppointment(
          {
            patientId,
            appointmentStatus: APPOINTMENT_BOOKED,
            appointmentDateTime,
          },
          req,
          res
        );
        res.status(200).send(newAppointment);
      } else {
        // user does not have record in this hospital
        try {
          const newPatient = await Patient.create({ userId, hospitalId });
          const newAppointment = await createAppointment(
            {
              patientId: newPatient.id,
              appointmentDateTime,
              appointmentStatus: APPOINTMENT_BOOKED,
            },
            req,
            res
          );

          res.status(200).send(newAppointment);
        } catch (err) {
          console.log(err);
          res.sendStatus(500);
        }
      }
    } else {
      // if it is a new user
      //TODO
    }

    // const userList = await User.findOne({ where: {} });
    // console.log(userList);
    // res.status(200).send(userList);
  } catch (err) {
    console.log(err);
  }
});

const createAppointment = async (data, req, res) => {
  let { patientId, appointmentStatus, appointmentDateTime } = data;
  console.log({ patientId, appointmentStatus, appointmentDateTime });
  if (!patientId || !appointmentDateTime || !appointmentStatus) {
    res.status(500).send("Check Appointment Data");
  }
  try {
    const newAppointment = await Appointment.create({
      patientId,
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
