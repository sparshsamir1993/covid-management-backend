const verifyToken = require("../../../middlewares/verifyToken");

var router = require("express").Router();
const Appointment = require("../../../models/appointment");
router.get(
  "/appointment/:hospitalId",
  verifyToken(),
  async (req, res, next) => {
    try {
      let { hospitalId } = req.params;
      console.log(hospitalId);
      let appointments = await Appointment.findAll({ where: { hospitalId } });
      res.status(200).send(appointments);
    } catch (err) {
      res.sendStatus(404);
      console.log(err);
    }
  }
);

module.exports = router;
